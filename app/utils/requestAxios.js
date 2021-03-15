import Axios from 'axios';
import swal from 'sweetalert2';
/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
// const header = '';
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

const DOMAIN_API = 'https://api-nodejs-todolist.herokuapp.com'

const HEADERS = {
  Authorization:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Zjc2ZTQzN2E2YTY3MzAwMTc0NzFjNmIiLCJpYXQiOjE2MDE2MjcxOTJ9.x6hiHZB6izKaoLB5RRKKeqX-J5TlqtFJMDu2NVtl5ak',
}
export function excute(method = 'GET', pathUrl, body) {
  return Axios({
    method,
    url: `${DOMAIN_API}/${pathUrl}`,
    data: body,
    headers: HEADERS,
  })
    .catch((err) => {
      console.log(err);
    })

}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}


/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options) {
  // console.log('test',options)
  return fetch(url, options)
    .then(checkStatus)
    //   .then(getList)
    .then(parseJSON)

}
