import { useNetwork } from 'wagmi'

export function ConnectNetwork() {
  const { chain, chains } = useNetwork()

  return (
    <>
      {chain && <div>Connected to {chain.name}</div>}
      {chains && (
        <div>Available chains: {chains.map((chain) => chain.name)}</div>
      )}
    </>
  )
}