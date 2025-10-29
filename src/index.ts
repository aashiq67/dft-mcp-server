
import { env, WorkerEntrypoint } from 'cloudflare:workers'
import { configureRuntime } from './lib/runtime'
import { ProxyToSelf } from 'workers-mcp'
import * as consultations from './domains/consultations'
import * as mindfulness from './domains/mindfulness'
import * as dopamart from './domains/dopamart'
import * as subscriptions from './domains/subscriptions'
import * as users from './domains/users'

// Environment is now initialized in src/lib/http.ts

export default class MyWorker extends WorkerEntrypoint<{ SERVER_URL: string, SHARED_SECRET: string, ADMIN_API_TOKEN: string }> {
  /**
   * A warm, friendly greeting from your new Workers MCP server.
   * @param name {string} the name of the person we are greeting.
   * @return {string} the contents of our greeting.
   */
  sayHello(name: string) {
    return `Hello from an MCP Worker, ${name}!`
  }

  /**
   * Specialization entity (see Django model `Specialization`).
   * @typedef {Object} Specialization
   * @property {number} id - Primary key.
   * @property {string} name - Unique specialization name.
   * @property {string|null} description - Optional free-text description.
   * @property {string[]|null} commonConditions - Optional list of common conditions.
   * @property {string[]|null} treatmentApproaches - Optional list of treatment approaches.
   */

  /**
   * Doctor entity (see Django model `Doctor`).
   * Notes:
   * - API responses typically serialize decimals (rating, consultation_fee) as strings, e.g. "4.90".
   * - `specializations` are usually expanded to specialization objects; on create/update, send IDs.
   * - `availableSlots` are daily time slots in HH:MM (24h, UTC).
   * @typedef {Object} Doctor
   * @property {number} id - Primary key.
   * @property {string} name - Doctor's full name (unique, required).
   * @property {Specialization[]} specializations - Assigned specializations (expanded in responses).
   * @property {number} experience - Years of experience (positive integer).
   * @property {string} rating - Average rating as a string with 2 decimals (e.g. "4.90").
   * @property {number} review_count - Number of reviews.
   * @property {string} location - City/Country or free-text location.
   * @property {string[]} languages - Languages spoken.
   * @property {string} consultation_fee - Fee as string with 2 decimals (e.g. "1400.00").
   * @property {string} availability - Availability label (e.g., "Available").
   * @property {string} image - URL to profile image.
   * @property {boolean} verified - Whether the profile is verified.
   * @property {string} bio - Biography/summary.
   * @property {number} patient_count - Historical patient count.
   * @property {string} degree - Degrees/qualifications (e.g., "MBBS, MD").
   * @property {string|null} hospital - Affiliated hospital, if any.
   * @property {string[]} availableSlots - Daily available time slots (HH:MM, UTC).
   */

  /**
   * Payload to create a doctor.
   * - Send specialization IDs, not objects.
   * - Server derives rating, review_count, patient_count.
   * @typedef {Object} CreateDoctorInput
   * @property {string} name
   * @property {number[]} specializations - Array of specialization IDs.
   * @property {number} experience
   * @property {string} [location]
   * @property {string[]} languages
   * @property {string|number} consultation_fee - Decimal string or number.
   * @property {string} [availability]
   * @property {string} [image]
   * @property {boolean} [verified]
   * @property {string} bio
   * @property {string} degree
   * @property {string|null} [hospital]
   * @property {string[]} [availableSlots]
   */

  /**
   * Payload to update a doctor (partial).
   * @typedef {Partial<CreateDoctorInput>} UpdateDoctorInput
   */

  /**
   * Payload to create a specialization.
   * @typedef {Object} CreateSpecializationInput
   * @property {string} name
   * @property {string} [description]
   * @property {string[]} [commonConditions]
   * @property {string[]} [treatmentApproaches]
   */

  /**
   * Payload to update a specialization (partial).
   * @typedef {Partial<CreateSpecializationInput>} UpdateSpecializationInput
   */

  /**
   * Product entity (see Django model `Product`).
   * Notes:
   * - `price` is a decimal; API responses typically serialize decimals as strings (e.g., "199.99").
   * - `created_at` is an ISO timestamp string.
   * @typedef {Object} Product
   * @property {number} id - Primary key.
   * @property {string} name - Product name.
   * @property {string|null} description - Optional description.
   * @property {string} price - Price as decimal string with 2 decimals.
   * @property {number} stock - Available stock (non-negative integer).
   * @property {string|null} image - Optional image URL.
   * @property {string} created_at - ISO timestamp of creation.
   */

  /**
   * Payload to create a product.
   * @typedef {Object} CreateProductInput
   * @property {string} name
   * @property {string|number} price - Decimal string or number.
   * @property {number} [stock]
   * @property {string} [description]
   * @property {string} [image]
   */

  /**
   * Payload to update a product (partial).
   * @typedef {Partial<CreateProductInput>} UpdateProductInput
   */

  /**
   * Category entity (see Django model `Category`).
   * @typedef {Object} Category
   * @property {string} id - UUID.
   * @property {string} name - Unique category name.
   * @property {string|null} description
   * @property {string|null} background_img - Background image URL.
   * @property {boolean} is_active
   * @property {string[]|null} tags
   * @property {string|null} curator - Curator's note.
   * @property {number|null} rating - Average rating.
   * @property {number} played_count
   * @property {number} track_count
   * @property {number} duration_seconds
   * @property {string} created_at - ISO timestamp.
   * @property {string} updated_at - ISO timestamp.
   */

  /**
   * Payload to create a category.
   * @typedef {Object} CreateCategoryInput
   * @property {string} name
   * @property {string} [description]
   * @property {string} [background_img]
   * @property {boolean} [is_active]
   * @property {string[]} [tags]
   * @property {string} [curator]
   */

  /** @typedef {Partial<CreateCategoryInput>} UpdateCategoryInput */

  /**
   * Track entity (see Django model `Track`).
   * @typedef {Object} Track
   * @property {string} id - UUID.
   * @property {string} title
   * @property {string|null} description
   * @property {string|null} background_img
   * @property {string} audio_file - URL to audio file.
   * @property {string[]|null} tags
   * @property {string|null} category - Category UUID or embedded category (API dependent).
   * @property {number} duration_seconds
   * @property {number} played_count
   * @property {number} liked_count
   * @property {number} bookmarked_count
   * @property {boolean} is_active
   * @property {string} created_at - ISO timestamp.
   * @property {string} updated_at - ISO timestamp.
   */

  /**
   * Payload to create a track.
   * @typedef {Object} CreateTrackInput
   * @property {string} title
   * @property {string} audio_file
   * @property {string} [description]
   * @property {string} [background_img]
   * @property {string[]} [tags]
   * @property {string} [category] - Category UUID.
   * @property {number} [duration_seconds]
   * @property {boolean} [is_active]
   */

  /** @typedef {Partial<CreateTrackInput>} UpdateTrackInput */

  /**
   * List doctors
   * GET `/api/v1/consultations/doctors/`
   * Returns an array of {@link Doctor} objects (tool-formatted JSON).
   * On error, returns a tool-formatted object with an `error` message.
   */
  async getDoctors() {
    return consultations.getDoctors()
  }

  // Consultations domain
  /**
   * Retrieve a doctor by ID
   * GET `/api/v1/consultations/doctors/:id/`
   * @param {string} id - Doctor ID
   * Returns a single {@link Doctor} (tool-formatted JSON) or an error payload.
   */
  async getDoctorById(id: string) { return consultations.getDoctorById(id) }
  // async listConsultations() { return consultations.listConsultations() }
  /**
   * Create a doctor
   * POST `/api/v1/consultations/doctors/`
   * @param {CreateDoctorInput} input - Doctor payload; use specialization IDs.
   * Returns the created {@link Doctor} (tool-formatted JSON) or an error payload.
   */
  async createDoctor(input: unknown) { return consultations.createDoctor(input) }
  /**
   * Update a doctor
   * PATCH `/api/v1/consultations/doctors/:id/`
   * @param {string} id - Doctor ID
   * @param {UpdateDoctorInput} input - Partial update payload.
   * Returns the updated {@link Doctor} (tool-formatted JSON) or an error payload.
   */
  async updateDoctor(id: string, input: unknown) { return consultations.updateDoctor(id, input) }
  /**
   * Delete a doctor
   * DELETE `/api/v1/consultations/doctors/:id/`
   * @param {string} id - Doctor ID
   * Returns a success payload or server-defined body (tool-formatted JSON).
   */
  async deleteDoctor(id: string) { return consultations.deleteDoctor(id) }

  // Specializations (mirroring doctors)
  /**
   * List specializations
   * GET `/api/v1/consultations/specializations/`
   * Returns an array of {@link Specialization} (tool-formatted JSON) or an error payload.
   */
  async getSpecializations() { return consultations.getSpecializations() }
  /**
   * Retrieve a specialization by ID
   * GET `/api/v1/consultations/specializations/:id/`
   * @param {string} id - Specialization ID
   * Returns a single {@link Specialization} (tool-formatted JSON) or an error payload.
   */
  async getSpecializationById(id: string) { return consultations.getSpecializationById(id) }
  /**
   * Create a specialization
   * POST `/api/v1/consultations/specializations/`
   * @param {CreateSpecializationInput} input - Specialization payload.
   * Returns the created {@link Specialization} (tool-formatted JSON) or an error payload.
   */
  async createSpecialization(input: unknown) { return consultations.createSpecialization(input) }
  /**
   * Update a specialization
   * PATCH `/api/v1/consultations/specializations/:id/`
   * @param {string} id - Specialization ID
   * @param {UpdateSpecializationInput} input - Partial update payload.
   * Returns the updated {@link Specialization} (tool-formatted JSON) or an error payload.
   */
  async updateSpecialization(id: string, input: unknown) { return consultations.updateSpecialization(id, input) }
  /**
   * Delete a specialization
   * DELETE `/api/v1/consultations/specializations/:id/`
   * @param {string} id - Specialization ID
   * Returns a success payload or server-defined body (tool-formatted JSON).
   */
  async deleteSpecialization(id: string) { return consultations.deleteSpecialization(id) }

  // Mindfulness domain
  /**
   * List categories
   * GET `/api/v1/mindfulness/categories/`
   * Returns an array of {@link Category} (tool-formatted JSON) or an error payload.
   */
  async listCategories() { return mindfulness.listCategories() }
  /**
   * Retrieve a category by ID
   * GET `/api/v1/mindfulness/categories/:id/`
   * @param {string} id - Category UUID
   * Returns a single {@link Category} (tool-formatted JSON) or an error payload.
   */
  async getCategoryById(id: string) { return mindfulness.getCategoryById(id) }
  /**
   * Create a category
   * POST `/api/v1/mindfulness/categories/`
   * @param {CreateCategoryInput} input - Category payload
   * Returns the created {@link Category} (tool-formatted JSON) or an error payload.
   */
  async createCategory(input: unknown) { return mindfulness.createCategory(input) }
  /**
   * Update a category
   * PATCH `/api/v1/mindfulness/categories/:id/`
   * @param {string} id - Category UUID
   * @param {UpdateCategoryInput} input - Partial update payload
   * Returns the updated {@link Category} (tool-formatted JSON) or an error payload.
   */
  async updateCategory(id: string, input: unknown) { return mindfulness.updateCategory(id, input) }
  /**
   * Delete a category
   * DELETE `/api/v1/mindfulness/categories/:id/`
   * @param {string} id - Category UUID
   * Returns a success payload or server-defined body (tool-formatted JSON).
   */
  async deleteCategory(id: string) { return mindfulness.deleteCategory(id) }

  /**
   * List tracks
   * GET `/api/v1/mindfulness/tracks/`
   * Returns an array of {@link Track} (tool-formatted JSON) or an error payload.
   */
  async listTracks() { return mindfulness.listTracks() }
  /**
   * Retrieve a track by ID
   * GET `/api/v1/mindfulness/tracks/:id/`
   * @param {string} id - Track UUID
   * Returns a single {@link Track} (tool-formatted JSON) or an error payload.
   */
  async getTrackById(id: string) { return mindfulness.getTrackById(id) }
  /**
   * Create a track
   * POST `/api/v1/mindfulness/tracks/`
   * @param {CreateTrackInput} input - Track payload
   * Returns the created {@link Track} (tool-formatted JSON) or an error payload.
   */
  async createTrack(input: unknown) { return mindfulness.createTrack(input) }
  /**
   * Update a track
   * PATCH `/api/v1/mindfulness/tracks/:id/`
   * @param {string} id - Track UUID
   * @param {UpdateTrackInput} input - Partial update payload
   * Returns the updated {@link Track} (tool-formatted JSON) or an error payload.
   */
  async updateTrack(id: string, input: unknown) { return mindfulness.updateTrack(id, input) }
  /**
   * Delete a track
   * DELETE `/api/v1/mindfulness/tracks/:id/`
   * @param {string} id - Track UUID
   * Returns a success payload or server-defined body (tool-formatted JSON).
   */
  async deleteTrack(id: string) { return mindfulness.deleteTrack(id) }

  // Dopamart domain
  /**
   * List products
   * GET `/api/v1/dopamart/products/`
   * Returns an array of {@link Product} (tool-formatted JSON) or an error payload.
   */
  async listProducts() { return dopamart.listProducts() }
  /**
   * Retrieve a product by ID
   * GET `/api/v1/dopamart/products/:id/`
   * @param {string} id - Product ID
   * Returns a single {@link Product} (tool-formatted JSON) or an error payload.
   */
  async getProductById(id: string) { return dopamart.getProductById(id) }
  /**
   * Create a product
   * POST `/api/v1/dopamart/products/`
   * @param {CreateProductInput} input - Product payload
   * Returns the created {@link Product} (tool-formatted JSON) or an error payload.
   */
  async createProduct(input: unknown) { return dopamart.createProduct(input) }
  /**
   * Update a product
   * PATCH `/api/v1/dopamart/products/:id/`
   * @param {string} id - Product ID
   * @param {UpdateProductInput} input - Partial update payload
   * Returns the updated {@link Product} (tool-formatted JSON) or an error payload.
   */
  async updateProduct(id: string, input: unknown) { return dopamart.updateProduct(id, input) }
  /**
   * Delete a product
   * DELETE `/api/v1/dopamart/products/:id/`
   * @param {string} id - Product ID
   * Returns a success payload or server-defined body (tool-formatted JSON).
   */
  async deleteProduct(id: string) { return dopamart.deleteProduct(id) }

  // Subscriptions domain
  /**
   * SubscriptionPlan entity (see Django model `SubscriptionPlan`).
   * Notes: `price` is a decimal; API responses typically serialize decimals as strings (e.g., "299.00").
   * @typedef {Object} SubscriptionPlan
   * @property {string} id - UUID.
   * @property {string} name
   * @property {number} duration_months
   * @property {string} price - Decimal string with 2 decimals.
   * @property {string[]} features - List of feature labels.
   * @property {boolean} is_active
   * @property {string} created_at - ISO timestamp.
   * @property {string} updated_at - ISO timestamp.
   */

  /**
   * Payload to create a subscription plan.
   * @typedef {Object} CreateSubscriptionPlanInput
   * @property {string} name
   * @property {number|string} duration_months
   * @property {string|number} price
   * @property {string[]} [features]
   * @property {boolean} [is_active]
   */

  /** @typedef {Partial<CreateSubscriptionPlanInput>} UpdateSubscriptionPlanInput */

  /**
   * List subscription plans
   * GET `/api/v1/subscriptions/plans/`
   * Returns an array of {@link SubscriptionPlan} (tool-formatted JSON) or an error payload.
   */
  async listPlans() { return subscriptions.listPlans() }
  /**
   * Retrieve a plan by ID
   * GET `/api/v1/subscriptions/plans/:id/`
   * @param {string} id - Plan UUID
   * Returns a single {@link SubscriptionPlan} (tool-formatted JSON) or an error payload.
   */
  async getPlanById(id: string) { return subscriptions.getPlanById(id) }
  /**
   * Create a subscription plan
   * POST `/api/v1/subscriptions/plans/`
   * @param {CreateSubscriptionPlanInput} input - Plan payload
   * Returns the created {@link SubscriptionPlan} (tool-formatted JSON) or an error payload.
   */
  async createPlan(input: unknown) { return subscriptions.createPlan(input) }
  /**
   * Update a subscription plan
   * PATCH `/api/v1/subscriptions/plans/:id/`
   * @param {string} id - Plan UUID
   * @param {UpdateSubscriptionPlanInput} input - Partial update payload
   * Returns the updated {@link SubscriptionPlan} (tool-formatted JSON) or an error payload.
   */
  async updatePlan(id: string, input: unknown) { return subscriptions.updatePlan(id, input) }
  /**
   * Delete a subscription plan
   * DELETE `/api/v1/subscriptions/plans/:id/`
   * @param {string} id - Plan UUID
   * Returns a success payload or server-defined body (tool-formatted JSON).
   */
  async deletePlan(id: string) { return subscriptions.deletePlan(id) }
  // User subscriptions endpoint TBD; keeping existing method
  async getUserSubscriptions(userId: string) { return subscriptions.getUserSubscriptions(userId) }

  // Users domain
  async getUserProfile(userId: string) { return users.getProfile(userId) }
  async updateUserProfile(userId: string, input: unknown) { return users.updateProfile(userId, input) }

  /**
   * @ignore
   **/
  async fetch(request: Request): Promise<Response> {
    configureRuntime({ SERVER_URL: this.env.SERVER_URL, ADMIN_API_TOKEN: this.env.ADMIN_API_TOKEN })
    return new ProxyToSelf(this).fetch(request)
  }
}
