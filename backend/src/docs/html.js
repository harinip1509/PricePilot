function getDocsHtml() {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PricePilot Backend Docs</title>
    <style>
      :root {
        --bg: #f4f7fb;
        --panel: #ffffff;
        --border: #d8e0eb;
        --text: #1d2a38;
        --muted: #5f7184;
        --accent: #1f6feb;
        --accent-dark: #154ea8;
        --success: #0f9d58;
        --error: #c62828;
        --code: #0f1720;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        background: linear-gradient(180deg, #edf4ff 0%, var(--bg) 100%);
        color: var(--text);
      }

      .shell {
        max-width: 1100px;
        margin: 0 auto;
        padding: 32px 20px 56px;
      }

      .hero {
        background: linear-gradient(135deg, #0f1720 0%, #1d3557 100%);
        color: white;
        border-radius: 24px;
        padding: 28px;
        box-shadow: 0 20px 50px rgba(20, 35, 60, 0.18);
      }

      .hero h1 {
        margin: 0 0 8px;
        font-size: 2rem;
      }

      .hero p {
        margin: 0;
        color: rgba(255, 255, 255, 0.82);
        line-height: 1.6;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 20px;
        margin-top: 24px;
      }

      .card {
        background: var(--panel);
        border: 1px solid var(--border);
        border-radius: 20px;
        padding: 20px;
        box-shadow: 0 14px 32px rgba(30, 52, 84, 0.08);
      }

      h2 {
        margin: 0 0 12px;
        font-size: 1.15rem;
      }

      p.help {
        margin: 0 0 16px;
        color: var(--muted);
        line-height: 1.55;
      }

      label {
        display: block;
        font-weight: 600;
        margin: 12px 0 6px;
      }

      input, textarea {
        width: 100%;
        border: 1px solid var(--border);
        border-radius: 12px;
        padding: 12px 14px;
        font: inherit;
        color: var(--text);
        background: #fbfdff;
      }

      textarea {
        min-height: 120px;
        resize: vertical;
      }

      button {
        margin-top: 14px;
        border: 0;
        border-radius: 12px;
        background: var(--accent);
        color: white;
        font: inherit;
        font-weight: 700;
        padding: 12px 16px;
        cursor: pointer;
      }

      button:hover {
        background: var(--accent-dark);
      }

      .endpoint {
        display: inline-block;
        padding: 6px 10px;
        border-radius: 999px;
        background: #eaf2ff;
        color: var(--accent-dark);
        font-weight: 700;
        margin-bottom: 10px;
      }

      pre {
        margin: 0;
        background: var(--code);
        color: #d7e2f0;
        padding: 16px;
        border-radius: 14px;
        overflow: auto;
        line-height: 1.5;
        min-height: 180px;
      }

      .status {
        margin-top: 12px;
        font-weight: 700;
      }

      .status.success {
        color: var(--success);
      }

      .status.error {
        color: var(--error);
      }

      .row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
      }

      .hint {
        margin-top: 18px;
        padding: 14px 16px;
        border-radius: 14px;
        background: #f3f8ff;
        color: var(--muted);
        border: 1px solid #dce8fb;
      }

      code {
        font-family: Consolas, "Courier New", monospace;
      }

      @media (max-width: 640px) {
        .row {
          grid-template-columns: 1fr;
        }
      }
    </style>
  </head>
  <body>
    <main class="shell">
      <section class="hero">
        <h1>PricePilot Backend Docs</h1>
        <p>
          Use this page to test the auth API directly in your browser. Start with signup,
          then login, then use the returned token for the protected profile route.
        </p>
      </section>

      <section class="grid">
        <article class="card">
          <div class="endpoint">POST /auth/signup</div>
          <h2>Create account</h2>
          <p class="help">Registers a new user and returns a JWT token plus the saved profile.</p>
          <label for="signup-name">Name</label>
          <input id="signup-name" value="Harini" />
          <label for="signup-email">Email</label>
          <input id="signup-email" type="email" value="harini@example.com" />
          <label for="signup-password">Password</label>
          <input id="signup-password" type="password" value="secret123" />
          <button id="signup-button">Send signup request</button>
          <div id="signup-status" class="status"></div>
        </article>

        <article class="card">
          <div class="endpoint">POST /auth/login</div>
          <h2>Login</h2>
          <p class="help">Logs in an existing user. The returned token is auto-filled below.</p>
          <label for="login-email">Email</label>
          <input id="login-email" type="email" value="harini@example.com" />
          <label for="login-password">Password</label>
          <input id="login-password" type="password" value="secret123" />
          <button id="login-button">Send login request</button>
          <div id="login-status" class="status"></div>
        </article>

        <article class="card">
          <div class="endpoint">GET /user/profile</div>
          <h2>Protected profile</h2>
          <p class="help">Paste a bearer token here or login first and the token will populate automatically.</p>
          <label for="token">JWT token</label>
          <textarea id="token" spellcheck="false"></textarea>
          <button id="profile-button">Fetch profile</button>
          <div id="profile-status" class="status"></div>
        </article>

        <article class="card">
          <div class="endpoint">Live response</div>
          <h2>API output</h2>
          <p class="help">Latest server response from any request on this page.</p>
          <pre id="output">Run a request to see the response here.</pre>
          <div class="hint">
            Quick browser checks:
            <br />
            <code>GET /health</code> at <code>http://localhost:4000/health</code>
            <br />
            <code>Docs</code> at <code>http://localhost:4000/docs</code>
          </div>
        </article>
      </section>
    </main>

    <script>
      const output = document.getElementById("output");
      const tokenField = document.getElementById("token");

      function setStatus(id, message, ok) {
        const node = document.getElementById(id);
        node.textContent = message;
        node.className = "status " + (ok ? "success" : "error");
      }

      function setOutput(title, payload) {
        output.textContent = title + "\\n\\n" + JSON.stringify(payload, null, 2);
      }

      async function request(path, options = {}) {
        const response = await fetch(path, options);
        const data = await response.json().catch(() => ({ message: "No JSON response body." }));

        if (!response.ok) {
          const error = new Error(data.message || "Request failed.");
          error.payload = data;
          throw error;
        }

        return data;
      }

      document.getElementById("signup-button").addEventListener("click", async () => {
        try {
          const payload = {
            name: document.getElementById("signup-name").value,
            email: document.getElementById("signup-email").value,
            password: document.getElementById("signup-password").value,
          };

          const data = await request("/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          if (data.token) {
            tokenField.value = data.token;
          }

          setStatus("signup-status", data.message || "Signup successful.", true);
          setOutput("Signup response", data);
        } catch (error) {
          setStatus("signup-status", error.message, false);
          setOutput("Signup error", error.payload || { message: error.message });
        }
      });

      document.getElementById("login-button").addEventListener("click", async () => {
        try {
          const payload = {
            email: document.getElementById("login-email").value,
            password: document.getElementById("login-password").value,
          };

          const data = await request("/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          if (data.token) {
            tokenField.value = data.token;
          }

          setStatus("login-status", data.message || "Login successful.", true);
          setOutput("Login response", data);
        } catch (error) {
          setStatus("login-status", error.message, false);
          setOutput("Login error", error.payload || { message: error.message });
        }
      });

      document.getElementById("profile-button").addEventListener("click", async () => {
        try {
          const token = tokenField.value.trim();

          const data = await request("/user/profile", {
            method: "GET",
            headers: { Authorization: "Bearer " + token },
          });

          setStatus("profile-status", "Profile loaded successfully.", true);
          setOutput("Profile response", data);
        } catch (error) {
          setStatus("profile-status", error.message, false);
          setOutput("Profile error", error.payload || { message: error.message });
        }
      });
    </script>
  </body>
</html>`;
}

module.exports = {
  getDocsHtml,
};
