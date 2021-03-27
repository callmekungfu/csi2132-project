# Server API Map

```json
{
  "/hotel-brands": {
    "/": ["POST", "GET"],
    "/:brandId": {
      "/": ["PUT", "GET", "DELETE"],
      "/address": ["PUT", "GET"],
      "/phones": {
        "/": ["POST", "GET"],
        "/:phoneId": ["GET", "DELETE"]
      },
      "/emails": {
        "/": ["POST", "GET"],
        "/:emailId": ["GET", "DELETE"]
      },
      "hotels": {
        "/": ["POST", "GET"],
        "/:hotelId": {
          "/": ["PUT", "GET", "DELETE"],
          "/address": ["PUT", "GET"],
          "/phones": {
            "/": ["POST", "GET"],
            "/:phoneId": ["GET", "DELETE"]
          },
          "/emails": {
            "/": ["POST", "GET"],
            "/:emailId": ["GET", "DELETE"]
          },
          "/rooms": {
            "/": ["GET", "POST"],
            "/:roomId": {
              "/": ["GET", "PUT", "DELETE"],
            }
          },
          "/employees": {
            "/": ["POST", "GET"],
            "/:employeeId": {
              "/": ["GET"],
            }
          },
          "/bookings": {
            "/": ["GET", "POST"],
            "/:bookingId": {
              "/": ["GET", "DELETE"],
              "/customers": ["GET"]
            }
          }
        }
      },
    },
  },
  "/employees": {
    "/": ["POST"],
    "/:employeeId": {
      "/": ["PUT", "DELETE", "GET"]
    }
  },
  "/customers": {
    "/": ["POST"],
    "/:customerId": {
      "/": ["PUT", "DELETE", "GET"]
    }
  }
}