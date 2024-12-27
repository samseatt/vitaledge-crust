# VitalEdge Crust

VitalEdge Crust is the gateway and integration layer for the VitalEdge ecosystem. Acting as a comprehensive facade, Crust facilitates communication between the various components of VitalEdge, including analytics, dashboards, patient twins, cases, and more. It also handles cross-cutting concerns such as security, logging, and blockchain integration, ensuring a seamless and secure interface for all user interactions.

**CRUST**: **Centralized Routing and Unified Service Tier**

## Features

- Acts as a unified facade for VitalEdge APIs:
  - **Analytics**: Integration with LangChain, ML pipelines, and traditional analytics.
  - **Dashboards**: Real-time and near-real-time data streaming to frontends.
  - **House, Twin, and Case APIs**: Facilitate interaction with AI-driven and patient-centric entities.
  - **Management and Admin APIs**: Enable system-level oversight and control.
  - **Security and Logging**: Centralized aspect-oriented services to ensure data security and system observability.

- **Real-Time Communication**:
  - Supports WebSocket-based streaming for real-time data visualization.
  - Works seamlessly with Redis-cached IoT data ingested from the Data Aggregator.

- **Scalable Architecture**:
  - Built on Node.js with Express and TypeScript for scalability and maintainability.
  - Modular and extensible design to integrate with various frontend clients (React Frontend and Unity XR).

## Prerequisites

- **Node.js**: Ensure Node.js (>=18.x.x) is installed.
- **Redis**: A running Redis instance for caching IoT data.
- **VitalEdge Data Aggregator**: Ensure the Data Aggregator microservice is operational.

## Installation

Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/samseatt/vitaledge-crust.git
cd vitaledge-crust
```

Install dependencies:

```bash
npm install
```

## Development

Run the development server with hot-reloading:

```bash
npm run dev
```

## Production

Build the project:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## API Overview

### 1. **Analytics API**
Handles queries and insights via LangChain and ML pipelines.

- **GET** `/analytics/insights`
  - Query analytics insights.
  - Parameters: `query` (string), `category` (string)
  - Example:
    ```bash
    curl -X GET "http://localhost:3000/analytics/insights?query=diabetes&category=genomics"
    ```

### 2. **Dashboard API**
Streams real-time IoT data for live visualizations.

- **WebSocket Endpoint**: `/dashboard/ws`
  - Connect to the WebSocket to receive updates.
  - Example:
    ```javascript
    const ws = new WebSocket('ws://localhost:3000/dashboard/ws');
    ```

### 3. **Other APIs**
Includes APIs for House, Twin, Case, Security, Admin, and Management.

Refer to the `docs/` folder for detailed API specifications.

## Project Structure

```plaintext
src/
├── config/                 # Configuration files
├── controllers/            # Controllers for handling requests
├── middleware/             # Middleware for logging, error handling, etc.
├── routes/                 # API route definitions
├── services/               # Service logic for different APIs
├── utils/                  # Utility functions and helpers
├── websockets/             # WebSocket setup and management
├── index.ts                # Main entry point
└── server.ts               # HTTP and WebSocket server setup
```

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Commit your changes: `git commit -m 'Add your feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
