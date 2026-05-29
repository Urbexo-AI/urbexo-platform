export default function Home() {
  return (
    <main style={{
      fontFamily: "Arial",
      padding: "40px",
      background: "#f5f5f5",
      minHeight: "100vh"
    }}>
      
      {/* Hero Section */}
      <section style={{
        background: "white",
        padding: "60px",
        borderRadius: "20px",
        marginBottom: "30px"
      }}>
        <h1 style={{
          fontSize: "48px",
          marginBottom: "20px"
        }}>
          Urbexo
        </h1>

        <p style={{
          fontSize: "20px",
          color: "#555"
        }}>
          AI-powered Infrastructure for Local Commerce Ecosystems
        </p>
      </section>

      {/* Featured Vendors */}
      <section style={{
        background: "white",
        padding: "40px",
        borderRadius: "20px",
        marginBottom: "30px"
      }}>
        <h2>Featured Vendors</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginTop: "20px"
        }}>
          <div style={{
            background: "#fafafa",
            padding: "20px",
            borderRadius: "12px"
          }}>
            Mermaid Aquariums
          </div>

          <div style={{
            background: "#fafafa",
            padding: "20px",
            borderRadius: "12px"
          }}>
            SP Center
          </div>

          <div style={{
            background: "#fafafa",
            padding: "20px",
            borderRadius: "12px"
          }}>
            Local Marketplace
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section style={{
        background: "white",
        padding: "40px",
        borderRadius: "20px",
        marginBottom: "30px"
      }}>
        <h2>Featured Products</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginTop: "20px"
        }}>
          <div style={{
            background: "#fafafa",
            padding: "20px",
            borderRadius: "12px"
          }}>
            Aquarium Products
          </div>

          <div style={{
            background: "#fafafa",
            padding: "20px",
            borderRadius: "12px"
          }}>
            Home Living
          </div>

          <div style={{
            background: "#fafafa",
            padding: "20px",
            borderRadius: "12px"
          }}>
            Smart Electronics
          </div>

          <div style={{
            background: "#fafafa",
            padding: "20px",
            borderRadius: "12px"
          }}>
            Outdoor Essentials
          </div>
        </div>
      </section>

      {/* City Feed */}
      <section style={{
        background: "white",
        padding: "40px",
        borderRadius: "20px"
      }}>
        <h2>City Commerce Feed</h2>

        <p style={{
          marginTop: "20px",
          color: "#666"
        }}>
          Connecting merchants, communities, logistics, and partners into one AI-powered ecosystem.
        </p>
      </section>

    </main>
  );
}
