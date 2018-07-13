# ForgetChat

One-time use chatroom that self-destructs when the participants leave.

## Design
* Alice and Bob generate the key pairs on the client
* Alice and Bob transmits the public key to the server
* Alice discovers Bob's public key on the server
* Alice encrypts the message with Bob's public key
* Alice transmits the encrypted message to the server
* The server relays the encrypted message to Bob
* Bob decrypts the message with his private key
