// path for api http://words.bighugelabs.com/api/2/{api key}/{word}/{format}
var dotenv = require('dotenv')
dotenv.load()
var request = require('request')
var Promise = require('bluebird')

var key = process.env.BHT_KEY

var baseUrl = 'http://words.bighugelabs.com/api/2/'+key
var excludeList = ['the','a','for','and','nor','or','but','yet','so','if','as']

var synonymAsync = Promise.promisify(synonym)

function synonym(word, callback){
	if (wordIsValid(word,excludeList)){
		request.get(baseUrl+'/'+word+'/json', function(err,res,body){
			if (err){
				callback(err)
			}
			else if(!err && res.statusCode == 200){
				console.log('hi')
				var thesaurus = JSON.parse(body)
				var synonyms = []
				if(thesaurus['noun']['syn']) synonyms = synonyms.concat(thesaurus['noun']['syn'])
				if(thesaurus['verb']['syn']) synonyms = synonyms.concat(thesaurus['verb']['syn'])
				picked = Math.floor(Math.random()*synonyms.length)
				console.log(synonyms)
				callback(synonyms[picked])
			}
			else callback(word) 
		})
	}
}

function wordIsValid(word,exclude){
	if (/^[a-z]+$/.test('word') && exclude.indexOf(word) == -1){
		return true
	}
	else return false
}

module.exports = synonymAsync