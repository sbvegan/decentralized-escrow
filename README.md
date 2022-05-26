# Decentralized Escrow

Escrows require trusted third parties, this dapp is a proof of concept that shows how trustless escrow can powered by smart contracts, Chainlink Keepers, and Data Feeds. 

## Inspiration

When you spend an embarrassing amount of time on Twitter, you sometimes see ridiculous things. One of those things was a $2M bet on whether the spot price of $LUNA would be higher or lower than $88 in one year. The bet was for $1M between an anon trader: AIgod and the creator of Terra: Do Kwon. The trusted escrow for the bet is wealthy niche celebrity Cobie.

After reading the saga, it left me thinking two things:

1. Damn. I know I'm blessed, but now I feel extremely poor.
2. This could've been done in a trustless manner with smart contracts and Chainlink.

## What it does

This is a proof of concept that creates trustless betting system. Two parties can bet on the price of assets supported by Chainlink data feeds and the payout is performed by the Chainlink on a certain end date.

## How I built it

Blockchain:
- Factory Pattern Smart Contracts
- Keeper Compatible Smart Contract
- Chainlink Keepers
- Chainlink Data Feed

Frontend:
- React
- Moralis UI Kit

I wrote a keeper compatible contract that takes two parties' wagers, the address of the data feed, and the bet expiration time. Once the contract is registered and the bets are placed, the keepers wait for the payday to come around. When the payday arrives, the keeper checks for the winner and sends the funds.

## Challenges I ran into

The biggest challenge I ran into was wiring up the front end. I'm not familiar with Moralis and I didn't make enough time to figure out how to finish the UI.

## Accomplishments that I'm proud of

The smart contract portion was completed.

## What I learned

I learned how to use Chainlink data feeds and keeper network to create a hybrid smart contract.

## What's next for Decentralized Escrow  

There's still a lot of work to be done. The contracts need to be refactored, cleaned up, gas optimized, and tested in depth (I'm sure they're exploitable in their current state). The front end needs to be finished and polished.