const apiEndpoint = 'https://discord.com/api/v8/applications/788555662602010644/guilds/791366170611679272/commands'
const botToken = 'Nzg4NTU1NjYyNjAyMDEwNjQ0.X9lNsA.74k2m03dC-F6nL5Y8feg3rkInM0'
const commandData = {
  "name": "penguin",
  "description": "Send a GIF of a penguin",
  "options": [
      {
          "name": "breed",
          "description": "The breed of penguin",
          "type": 3,
          "required": true,
          "choices": [
              {
                  "name": "Magellanic",
                  "value": "magellanic"
              },
              {
                  "name": "Emperor",
                  "value": "emperor"
              },
              {
                  "name": "Chinstrap",
                  "value": "chinstrap"
              },
              {
                  "name": "Gentoo",
                  "value": "gentoo"
              }
          ]
      },
      {
          "name": "stickers",
          "description": "Whether to show only stickers",
          "type": 5,
          "required": false
      }
  ]
}

async function main () {
  const fetch = require('node-fetch')

  const response = await fetch(apiEndpoint, {
    method: 'post',
    body: JSON.stringify(commandData),
    headers: {
      'Authorization': 'Bot ' + botToken,
      'Content-Type': 'application/json'
    }
  })
  const json = await response.json()

  console.log(json)
}
main()