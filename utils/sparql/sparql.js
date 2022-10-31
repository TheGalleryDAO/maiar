
import SPARQLQueryDispatcher from './SPARQLQueryDispatcher'

const endpointUrl = 'https://query.wikidata.org/sparql';
const queryDispatcher = new SPARQLQueryDispatcher( endpointUrl );


const getPaintersQuery = `
SELECT DISTINCT ?item ?itemLabel (GROUP_CONCAT(DISTINCT ?notableWork;separator=",") AS ?works) (GROUP_CONCAT(DISTINCT ?movement;separator=",") AS ?movements) (GROUP_CONCAT(DISTINCT ?movementLabel;separator=",") AS ?movementsLabels)  (GROUP_CONCAT(DISTINCT ?artWorkImage;separator=",") AS ?worksImages) (GROUP_CONCAT(DISTINCT?notableWorkLabel;separator=",") AS ?worksLabels)
WHERE 
{
  ?item wdt:P101 wd:Q11629;
        rdfs:label ?itemLabel;
        wdt:P135 ?movement;
        wdt:P800 ?notableWork.

  ?notableWork rdfs:label ?notableWorkLabel;
        wdt:P18 ?artWorkImage.

  ?movement rdfs:label ?movementLabel.

      FILTER langMatches(lang(?movementLabel), "en")
      FILTER langMatches(lang(?notableWorkLabel), "en")
      FILTER langMatches(lang(?itemLabel), "en")

            
  }
GROUP BY ?item ?itemLabel 

LIMIT 100`;


export {
  getPaintersQuery
}
queryDispatcher.query( _sparqlQuery )