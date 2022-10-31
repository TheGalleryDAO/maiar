export default class SPARQLQueryDispatcher {
	constructor( endpoint ) {
		this.endpoint = endpoint;
	}

	query( sparqlQuery ) {
    return new Promise(async (resolve, reject) => {
      const fullUrl = this.endpoint + '?query=' + encodeURIComponent( sparqlQuery );
      const headers = { 'Accept': 'application/sparql-results+json' };
  
      const data = await fetch( fullUrl, { headers } ).catch((err) => {console.log(err); reject("Sparql query failed.")})
      if(data && data.json()) 
        resolve(data.json())
      else
        reject("Sparqle query failed")
    })
	}
}