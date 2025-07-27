
# Playwright Core Architecture: Client-Server Communication

## Initialization Flow

1. **Entry Point**:
   - `node_modules/playwright-core/index.js` simply exports from `./lib/inprocess`
   - This calls `createInProcessPlaywright()` to initialize the communication channels

2. **Core Initialization** (`inProcessFactory.ts`):
   ```javascript
   function createInProcessPlaywright() {
     // 1. Create server-side Playwright instance
     const playwright = createPlaywright({ sdkLanguage: "javascript" });

     // 2. Establish client-server connections
     const clientConnection = new Connection();  // Client-side
     const dispatcherConnection = new DispatcherConnection();  // Server-side

     // 3. Set up bidirectional communication
     dispatcherConnection.onmessage = (message) => clientConnection.dispatch(message);
     clientConnection.onmessage = (message) => dispatcherConnection.dispatch(message);

     // ... (rest of initialization)
   }
   ```

## Client-Server Architecture

### Client Side (`lib/client`)
- **ChannelOwner**: Base class for all client API classes
  - Subclasses include:
    - `Page` (`page.js`) - contains client APIs like `page.goto()`
    - `Browser`
    - `BrowserContext`
    - etc.
- **Connection**: Manages communication to server

### Server Side (`lib/server`)
- **Dispatcher**: Base class for server-side handlers
  - Subclasses include:
    - `PageDispatcher` (`pageDispatcher.js`)
    - `BrowserDispatcher`
    - etc.
- **DispatcherConnection**: Manages communication to client

## Communication Pattern

When you call a client API like `page.goto()`:

1. Client `Page` (ChannelOwner subclass) sends message via `Connection`
2. Server `DispatcherConnection` routes to corresponding `PageDispatcher`
3. `PageDispatcher` executes the command on the actual browser
4. Response flows back through the same path

```
Client Code → Page (ChannelOwner) → Connection → DispatcherConnection → PageDispatcher → Browser
```

## Key Components Relationship

| Client Side            | Server Side             |
|------------------------|-------------------------|
| ChannelOwner           | Dispatcher              |
| Connection             | DispatcherConnection    |
| PlaywrightAPI          | Playwright              |
| Page/Browser/etc.      | PageDispatcher/BrowserDispatcher/etc. |

## Cross-Communication Mechanism

The magic happens in the connection setup:

```javascript
// Two-way message passing:
dispatcherConnection.onmessage = (message) => clientConnection.dispatch(message);
clientConnection.onmessage = (message) => dispatcherConnection.dispatch(message);
```

This creates a continuous loop where:
- Client messages go to server dispatchers
- Server responses come back to client ChannelOwners

## Practical Example: page.goto()

1. Your code calls `page.goto("https://example.com")`
2. Client `Page` instance serializes the request
3. Message sent via `Connection`
4. `DispatcherConnection` finds the matching `PageDispatcher`
5. `PageDispatcher` executes navigation in the real browser
6. Response (success/failure) travels back to your code

This architecture enables Playwright's cross-language support while maintaining a clean separation between the public API and the actual browser automation layer.
