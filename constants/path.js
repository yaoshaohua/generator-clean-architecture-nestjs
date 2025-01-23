/**
 * Paths to various files and directories in the project following Clean Architecture principles.
 */
module.exports = {
  // Controller Layer (Presentation Layer)
  /**
   * Directory for controllers which handle incoming HTTP requests and return responses.
   */
  CONTROLLERS_DIR: 'src/controllers',

  // Core Layer (Independent of Frameworks)
  /**
   * Directory for interfaces and abstract classes that define contracts for data services.
   */
  ABSTRACTS_DIR: 'src/core/abstracts',

  /**
   * Path to the abstract data services interface.
   */
  DATA_SERVICES_ABSTRACT_PATH: 'src/core/abstracts/data-services.abstract.ts',

  /**
   * Directory for application entities which contain business rules.
   */
  ENTITIES_DIR: 'src/core/entities',

  /**
   * Directory for Data Transfer Objects (DTOs) used across the application.
   */
  DTOS_DIR: 'src/core/dtos',

  // Application Layer (Application-specific Business Rules)
  /**
   * Directory for use cases which orchestrate the flow of data to and from entities.
   */
  USE_CASES_DIR: 'src/use-cases',

  // Adapter Layer (Frameworks and Drivers)
  /**
   * Path to the MongoDB data services module.
   */
  MONGO_DATA_SERVICES_MODULE_PATH: `src/frameworks/data-services/mongo/mongo-data-services.module.ts`,

  /**
   * Path to the MongoDB data services service.
   */
  MONGO_DATA_SERVICES_SERVICE_PATH: `src/frameworks/data-services/mongo/mongo-data-services.service.ts`,

  /**
   * Directory for models specific to the MongoDB implementation.
   */
  MONGO_MODELS_DIR: `src/frameworks/data-services/mongo/models`,

  // Main Application Module
  /**
   * Path to the main NestJS application module.
   */
  APP_MODULE_PATH: 'src/app.module.ts',
  
  /**
   * Relative path for import statements.
   */
  ENTITIES_RELATIVE_PATH: '../entities',
  CONTROLLERS_RELATIVE_PATH: '@controllers/index',
  MODEL_RELATIVE_PATH: './model'
};
