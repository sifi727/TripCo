export function get_port() {
  return (!process.env.dev) ?
    location.port :
    process.env.dev
}

export async function request(body, type, port=get_port(), host=location.hostname){
  return fetch('http://' + host + ":" + port + '/' + type, {
    method:"POST",
    body: JSON.stringify(body)
  }).then(response => {return response.json()}).catch(err => {console.error(err)});
}

export async function get_config(type, port=get_port(), host=location.hostname) {
  return fetch('http://' + host + ":" + port + '/config', {
    method:"GET"
  }).then(response => {return response.json()}).catch(err => {console.error(err)});
}

export function userFriendlyAttribute(attribute)
{
  let words = attribute.split("-").map((word)=> {
    return word.charAt(0).toUpperCase()+word.slice(1);

});
  return(words.join(' '));
}
