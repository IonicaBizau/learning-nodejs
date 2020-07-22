const VigenereCipher = require('text-ciphers').VigenereCipher;
const vigenereCipher = new VigenereCipher({
    keyword: 'coduri'
});
const deciphered = vigenereCipher.decipher('oionluqmniyzxjwreemvyhorkxinbtvkiangxr');
console.log(deciphered);
