import {createBackendSelasClient} from 'selas'


function createToken(address){
    return new Promise(async (resolve, reject) => {
      const client = createBackendSelasClient();
      await client.signIn(process.env.SELAS_USER, process.env.SELAS_PWD);
        const { data: token, error } = await client.createToken(address, 1, 60).catch((err) => {
            console.trace(err);
            reject(err)
        });
        console.log(error)
        console.log(token)
        resolve(token)

    })

}
export {
    createToken
}

  // use your own email and password

  // await client.createCustomer('xw39Aea!a9t');

  // await client.addCredits('xw39Aea!a9t', 100);

  // const { data: customer} = await client.getCustomer('benjamin');

  // // create a token to send to the front for a customer external_id / quota (in image generation) / ttl (in seconds) / description
  // const { data: token } = await client.createToken('benjamin', 1, 60);

  // // post a job with a token prompt / width / height / steps / guidance_scale / token_key
  // const {data: job, message, error } = await client.runStableDiffusion("cute cat", 512, 512, 100, 7.5, token?.key);

  // const whenJobIsDone = async (payload) => {
  //   const {data: results} = await client.getResults(payload.new.id);
  //   console.log(results);
  // };


  // //subscribe to job updates
  // await client.supabase.from("jobs").on("*", (payload) => {
  //   if (payload.new.status === "completed") {
  //     whenJobIsDone(payload);
  //   }
     
  //   }).subscribe();