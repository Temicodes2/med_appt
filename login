=== cURL Command ===
curl.exe -s -w "\n=== HTTP Status: %{http_code} ===\n" -X POST http://localhost:8181/api/auth/login -H "Content-Type: application/json" -d '{"email":"testuser@example.com","password":"password123"}'

=== Output ===
{"authtoken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNmIwYWY3NGExNWQ4MGFkZmRkYTIzNDgzIn0sImlhdCI6MTc5NTg4MTE5N30.W6z_eNSBJUYIU7hYjq9m-k-cE4SE18NEd4LzS7lWAIU"}
=== HTTP Status: 200 ===