const handleContribute = async () => {
  if (!connected || !publicKey) {
    setError('Please connect your wallet');
    return;
  }
  if (!project) return;

  const amount = parseFloat(contributionAmount);
  if (isNaN(amount) || amount <= 0) {
    setError('Please enter a valid amount');
    return;
  }
  if (project.min_contribution > 0 && amount < project.min_contribution) {
    setError(`Minimum contribution is ${project.min_contribution} SOL`);
    return;
  }
  if (project.max_contribution > 0 && amount > project.max_contribution) {
    setError(`Maximum contribution is ${project.max_contribution} SOL`);
    return;
  }
  const remaining = project.hard_cap - (project.raised_so_far || 0);
  if (amount > remaining) {
    setError(`Only ${remaining.toFixed(2)} SOL remaining in hard cap`);
    return;
  }

  // ─── Safely get and validate the launchpad public key ──────────
  const launchpadPubkeyStr = process.env.NEXT_PUBLIC_LAUNCHPAD_PUBLIC_KEY;
  if (!launchpadPubkeyStr) {
    setError('Platform wallet not configured. Please contact support.');
    return;
  }
  let launchpadPubkey: PublicKey;
  try {
    launchpadPubkey = new PublicKey(launchpadPubkeyStr);
  } catch {
    setError('Invalid platform wallet address. Please contact support.');
    return;
  }

  setContributing(true);
  setError(null);
  setSuccess(null);

  try {
    const lamports = amount * LAMPORTS_PER_SOL;

    const tx = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: launchpadPubkey,
        lamports,
      })
    );
    const { blockhash } = await connection.getLatestBlockhash();
    tx.recentBlockhash = blockhash;
    tx.feePayer = publicKey;

    const signature = await sendTransaction(tx, connection);

    const confirmRes = await fetch(`/api/launchpad/projects/${id}/contribute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        investorWallet: publicKey.toBase58(),
        amountSol: amount,
        txSignature: signature,
      }),
    });

    if (!confirmRes.ok) {
      const errData = await confirmRes.json();
      throw new Error(errData.error || 'Failed to record contribution');
    }

    setSuccess(`✅ Contributed ${amount} SOL successfully!`);
    setContributionAmount('');
    await fetchProject();
  } catch (err: any) {
    setError(err.message || 'Contribution failed');
  } finally {
    setContributing(false);
  }
};
