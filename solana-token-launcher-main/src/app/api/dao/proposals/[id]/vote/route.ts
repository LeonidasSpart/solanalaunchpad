import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getVotingPower } from '@/lib/dao';

export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const proposalId = parseInt(id);
    const { voter_wallet, vote } = await req.json();
    if (!voter_wallet || typeof vote !== 'boolean') {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // Check proposal exists and is active
    const proposalRes = await query('SELECT * FROM dao_proposals WHERE id = $1', [proposalId]);
    const proposal = proposalRes.rows[0];
    if (!proposal) {
      return NextResponse.json({ error: 'Proposal not found' }, { status: 404 });
    }
    const now = new Date();
    if (now < new Date(proposal.start_time) || now > new Date(proposal.end_time)) {
      return NextResponse.json({ error: 'Voting period is not active' }, { status: 400 });
    }

    // Check if already voted
    const existing = await query(
      'SELECT * FROM dao_votes WHERE proposal_id = $1 AND voter_wallet = $2',
      [proposalId, voter_wallet]
    );
    if (existing.rows.length > 0) {
      return NextResponse.json({ error: 'Already voted' }, { status: 400 });
    }

    // Get voting power
    const votingPower = await getVotingPower(voter_wallet, proposal.token_mint);
    if (votingPower <= 0) {
      return NextResponse.json({ error: 'No voting power' }, { status: 400 });
    }

    // Record vote
    await query(
      `INSERT INTO dao_votes (proposal_id, voter_wallet, vote, voting_power)
       VALUES ($1, $2, $3, $4)`,
      [proposalId, voter_wallet, vote, votingPower]
    );

    // Update proposal vote counts
    if (vote) {
      await query(
        'UPDATE dao_proposals SET yes_votes = yes_votes + $1 WHERE id = $2',
        [votingPower, proposalId]
      );
    } else {
      await query(
        'UPDATE dao_proposals SET no_votes = no_votes + $1 WHERE id = $2',
        [votingPower, proposalId]
      );
    }
    await query(
      'UPDATE dao_proposals SET total_voting_power = total_voting_power + $1 WHERE id = $2',
      [votingPower, proposalId]
    );

    return NextResponse.json({ success: true, votingPower });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to cast vote' }, { status: 500 });
  }
}
