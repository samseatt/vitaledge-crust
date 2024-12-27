### **VitalEdge Crust Architecture Document**

---

#### **Introduction**

**VitalEdge Crust** is the architectural foundation that integrates and orchestrates interactions across the VitalEdge ecosystem. Acting as a thick facade, it not only simplifies the complexity of backend microservices but also ensures secure, efficient, and real-time communication between the system and its end users. This document outlines the design, components, interactions, and technical details of the VitalEdge Crust microservice.

---

### **Purpose**

The **VitalEdge Crust** is designed to:
1. **Unify Access:** Act as the single entry point for frontend applications and external integrations to interact with backend services.
2. **Ensure Security:** Manage token validation, role-based access, encryption, and event logging.
3. **Support Real-Time Data:** Enable real-time data streams for dashboards and analytics using Redis and WebSocket technologies.
4. **Integrate Cross-Cutting Concerns:** Provide seamless aspect-oriented functionalities like logging, security, and blockchain recording.
5. **Facilitate Extensibility:** Support the addition of new APIs and features with minimal disruption to the existing architecture.

---

### **Core Architecture Components**

#### **1. Microservice Design**
- **Platform:** Node.js
- **Framework:** Express.js
- **Middleware:** Centralized middleware stack for logging, security, encryption, and data validation.
- **Communication:** RESTful APIs with potential for WebSocket or gRPC extensions for specific use cases.

#### **2. Middleware Layers**
- **Logging Middleware:** Logs all API interactions through the VitalEdge Logging microservice and sends critical logs to VitalEdge Blockchain.
- **Security Middleware:** Ensures token validation via VitalEdge Security and enforces role-based access controls.
- **Encryption Middleware:** Uses VitalEdge Crypt for encryption/decryption of sensitive data during transit or storage.
- **STT/TTS Middleware:** Converts speech-to-text and text-to-speech for supported APIs, particularly in XR contexts.

#### **3. API Gateway**
The API Gateway serves as the primary interaction layer, exposing categorized APIs:
- **Clinical Core API:** Handles traditional patient and clinical data.
- **Analytics API:** Provides access to LangChain, ML-* inferences, and other analytics results.
- **Dashboards API:** Supplies real-time and historical data for visualization.
- **House API:** Interfaces with the in-house AI doctor for insights and decision-making.
- **Twin API:** Enables interaction with a patient’s digital twin.
- **Case API:** Manages patient-specific cases and tracks their progress.
- **Pipes API:** Controls and monitors bioinformatics and ML pipelines.
- **Management API:** Handles system-oriented tasks like encryption, security, and token issuance.
- **Admin API:** Provides administrative functionalities, including logs, blockchain status, and pipeline scheduling.

#### **4. Real-Time Data Handling**
- **Data Aggregation:** Data from IoT devices and wearables are ingested via VitalEdge Data Aggregator, cached in Redis, and pushed to Crust.
- **Redis Integration:** Crust interfaces with Redis to deliver real-time data streams to dashboards and applications.
- **WebSocket Support:** Facilitates live updates to dashboards and XR interfaces.

#### **5. Aspect-Oriented Integration**
- **VitalEdge Logging:** Records every API interaction for auditing and debugging.
- **VitalEdge Blockchain:** Logs critical events like patient consent or data ingestion provenance.
- **VitalEdge Security:** Enforces user authentication and API access controls.
- **VitalEdge Crypt:** Encrypts sensitive data, ensuring compliance with privacy regulations.

#### **6. Speech and Voice Integration**
- **STT/TTS Integration:** Converts voice queries into text for processing and responds with synthesized speech.
- **Use Cases:**
  - Clinicians in XR environments using voice for hands-free interaction.
  - Voice-driven analytics queries through LangChain.

#### **7. Extensibility**
- **API Modularity:** Each API module is designed to be independently developed, deployed, and replaced.
- **Plug-and-Play Middleware:** Cross-cutting middleware can be added or updated without impacting API logic.

---

### **Technical Architecture**

#### **1. Deployment**
- **Environment:** Dockerized microservice, deployable on Kubernetes clusters.
- **Scalability:** Horizontal scaling to handle increasing API demand.

#### **2. Interaction Diagram**
```
Frontend (React/XR/Apps) <---> Crust API Gateway <---> Backend Microservices
          |                       |                          |
          |                       |                          |
    Redis/WebSocket       Logging/Security/Blockchain      Datalake/VectorDB
```

#### **3. Key Technologies**
- **Programming Language:** JavaScript/TypeScript
- **Frameworks:** Express.js for HTTP APIs, Socket.IO for WebSockets
- **Data Storage:** Redis for real-time data, MongoDB/PostgreSQL for backend data persistence
- **Security:** JWT authentication via VitalEdge Security
- **Voice Processing:** Google STT/TTS or similar for voice integration
- **Blockchain:** Hyperledger Fabric for critical event logging

#### **4. API Categorization**
Each API module is mapped to a specific backend microservice:
- **Core API:** Maps to VitalEdge Clinical Core.
- **Analytics API:** Maps to LangChain, ML-* pipelines, and traditional analytics.
- **Dashboards API:** Interfaces with Redis and Node.js Data Aggregator.
- **House API:** Directly connects to the in-house AI doctor.
- **Twin API:** Interfaces with the patient’s digital twin.
- **Case API:** Links to the Case management system.
- **Pipes API:** Controls data ingestion pipelines and ML training.
- **Management API:** Coordinates security, encryption, and logging tasks.
- **Admin API:** Oversees administrative functions like system health and monitoring.

---

### **Cross-Cutting Concerns**

1. **Security**:
   - Uses VitalEdge Security for JWT token validation and access control.
   - Encrypts sensitive payloads with VitalEdge Crypt.

2. **Logging**:
   - Every API interaction is logged.
   - Critical events are recorded on the VitalEdge Blockchain.

3. **Real-Time Data**:
   - Dashboards and XR rely on WebSocket streams or periodic polling from Redis caches.

4. **Voice Integration**:
   - STT/TTS enables natural interaction in immersive environments like XR.

---

### **Scalability Considerations**

- **Load Balancing:** Use of Kubernetes load balancers to distribute API requests.
- **Redis Clustering:** For scalability in real-time data delivery.
- **Microservice Isolation:** Modular design ensures high fault tolerance and independent scaling.

---

### **Conclusion**

The **VitalEdge Crust** is a robust, modular, and scalable architecture that bridges frontend applications with backend microservices while handling critical cross-cutting concerns. Its middleware-driven design ensures extensibility and compliance, making it a cornerstone for delivering personalized healthcare solutions. By enabling real-time interaction, secure access, and seamless integration, Crust facilitates a transformative healthcare experience for patients, clinicians, and administrators.

---

### **Appendix: VitalEdge Dashboard Architecture**

---

### **Introduction**

The VitalEdge Dashboard is a critical component designed to provide real-time and historical insights into patient metrics, IoT data, and other health-related information. It interfaces with the **VitalEdge Data Aggregator** (Node.js + Redis) for live data ingestion and caching, the **VitalEdge Crust** for secure and structured API delivery, and the frontend systems (React-based VitalEdge Frontend and Unity-based VitalEdge XR) for user interaction.

This document outlines the architecture and workflow of the VitalEdge Dashboard, highlighting its key components and data flow.

---

### **Key Components**

#### **1. Data Aggregator (Node.js + Redis)**
- **Role:** Acts as the primary ingestion and caching layer for IoT and wearable data.
- **Features:**
  - Ingests data from VitalEdge Pi IoT, Kit-iOS, lab systems, and other sources.
  - Normalizes and caches data in Redis with a configurable TTL (Time to Live).
  - Provides historical data storage in a PostgreSQL database for fallback and query purposes.
  - Pushes normalized data to Crust for API delivery.

#### **2. VitalEdge Crust**
- **Role:** Serves as the secure and structured API gateway for dashboard data.
- **Features:**
  - Pulls real-time data from Redis via Data Aggregator.
  - Handles fallback queries for historical data from PostgreSQL through Data Aggregator.
  - Integrates WebSocket and RESTful endpoints to support real-time and periodic updates.
  - Ensures security, logging, and encryption for data delivery to frontend systems.

#### **3. Frontend Systems**
- **React-Based Frontend:**
  - Displays dashboards as part of a web-based SPA (Single Page Application).
  - Polls Crust for data periodically or subscribes to WebSocket streams for real-time updates.
- **Unity XR:**
  - Visualizes dashboards in immersive AR/VR environments.
  - Leverages WebSocket streams for low-latency real-time updates.
  - Provides voice interaction (STT/TTS) for hands-free operation in XR.

---

### **Data Flow and Workflow**

#### **1. Real-Time Data Flow**
1. **Ingestion:**
   - IoT devices (e.g., Pi IoT) and apps (e.g., Kit-iOS) send data to the Data Aggregator via secure APIs.
   - Data Aggregator validates, normalizes, and caches the data in Redis with a TTL for fast access.
2. **Delivery to Crust:**
   - Crust periodically pulls cached data from Redis or listens for push updates.
   - Crust exposes this data via WebSocket streams or RESTful APIs, depending on frontend needs.
3. **Frontend Integration:**
   - The React-based frontend and Unity XR connect to Crust WebSocket streams for real-time updates or use REST APIs for periodic data fetches.

#### **2. Historical Data Flow**
1. **Storage in Data Aggregator:**
   - Data that exceeds Redis TTL or is deemed important is stored in PostgreSQL by the Data Aggregator.
2. **Querying Historical Data:**
   - Crust queries PostgreSQL through the Data Aggregator for historical insights or fallback requests.
3. **Frontend Delivery:**
   - Historical data is presented alongside real-time data in dashboards.

#### **3. WebSocket vs. REST API Workflow**
- **WebSocket (Real-Time):**
  - Ideal for live data visualization in dashboards.
  - Ensures low-latency updates, especially for XR applications.
- **REST API (Periodic):**
  - Suitable for traditional dashboard views where periodic updates suffice.
  - Supports fallback to historical data queries.

---

### **Interaction Diagram**

```plaintext
+-------------+         +------------------+         +-----------------+         +------------------+
|   IoT/Apps  |         |  Data Aggregator |         | VitalEdge Crust |         |  Frontend/XR     |
| (Pi IoT,    | ----->  |  (Node.js +      | ----->  |  (Node.js +     | ----->  |  (React, Unity)  |
| Kit-iOS)    |         |   Redis)         |         | Middleware)     |         |                  |
+-------------+         +------------------+         +-----------------+         +------------------+
   Data Ingestion          Normalization                Secure APIs               Visualization
                              +                        + Aspect-Oriented
                              +                        + Logging/Encryption
                              |
                       Historical Storage
                        (PostgreSQL)
```

---

### **Dashboard API Architecture**

#### **1. Crust API Endpoints**
- **`GET /dashboard/realtime`**
  - Fetches real-time data from Redis via the Data Aggregator.
  - Supports WebSocket streams for live updates.
- **`GET /dashboard/historical`**
  - Queries historical data from PostgreSQL through the Data Aggregator.
  - Accepts query parameters for filtering by device, metric, or time range.

#### **2. WebSocket Stream**
- Provides a low-latency, continuous data feed to React Frontend and Unity XR.
- Configurable update frequency based on application needs.

---

### **Scalability Considerations**

1. **Redis Clustering:**
   - Redis is configured as a clustered setup to handle high volumes of real-time data ingestion and retrieval.
2. **Load Balancing:**
   - Load balancers ensure even distribution of traffic across Data Aggregator and Crust instances.
3. **Historical Data Optimization:**
   - PostgreSQL uses indexes and partitioning to optimize queries for large datasets.

---

### **Conclusion**

The VitalEdge Dashboard architecture is designed for performance, reliability, and user-centric visualization. By leveraging Redis for real-time updates, PostgreSQL for historical queries, and Crust as a secure API gateway, the dashboard supports diverse user needs across web and XR environments. The architecture ensures extensibility, allowing future enhancements with minimal disruption.
