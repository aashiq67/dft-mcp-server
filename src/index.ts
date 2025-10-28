
import { WorkerEntrypoint } from 'cloudflare:workers'
import { ProxyToSelf } from 'workers-mcp'

export default class MyWorker extends WorkerEntrypoint<{ SHARED_SECRET: string }> {
  /**
   * A warm, friendly greeting from your new Workers MCP server.
   * @param name {string} the name of the person we are greeting.
   * @return {string} the contents of our greeting.
   */
  sayHello(name: string) {
    return `Hello from an MCP Worker, ${name}!`
  }

  /**
   * Doctor object returned by the doctors endpoint.
   * @typedef {Object} Doctor
   * @property {number} id
   * @property {string} name
   * @property {Object[]} specializations
   * @property {number} experience - Years of experience.
   * @property {number} rating
   * @property {number} review_count
   * @property {string} location
   * @property {string[]} languages
   * @property {number} consultation_fee
   * @property {unknown} availibility
   * @property {string} image
   * @property {boolean} verified
   * @property {number} patient_count
   * @property {string} degree
   * @property {string} hospital
   * @property {String[]} available_slots
   */

  /**
   * Fetches a list of doctors from the backend service.
   * Performs a GET request to `https://dft-app-backend-dev.up.railway.app/api/v1/consultations/doctors/`
   * and returns the parsed JSON data. If the request fails, returns an object
   * with an `error` property describing the failure.
   * @returns {Promise<Doctor[] | { error: string }>} List of doctors or an error object.
   */
  async getDoctors() {
    const url = 'https://dft-app-backend-dev.up.railway.app/api/v1/consultations/doctors/'
    try {
      const response = await fetch(url)
      if (!response.ok) {
        return {
          content: [{
            type: "text",
            text: JSON.stringify({ error: `Failed to fetch doctors: ${response.statusText}` })
          }]
        }
      }

      const data = await response.json()
      
      return {
        content: [{
          type: "text",
          text: JSON.stringify(data, null, 2)
        }]
      }
    } catch (error) {
      console.error('[MyWorker.getDoctors] error', { message: (error as Error).message })
      return {
        content: [{
          type: "text",
          text: JSON.stringify({ error: (error as Error).message })
        }]
      }
    }
  }

  /**
   * @ignore
   **/
  async fetch(request: Request): Promise<Response> {
    return new ProxyToSelf(this).fetch(request)
  }
}
