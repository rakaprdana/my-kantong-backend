import app from "./app";
import { connectDB } from "./config/database";

const PORT = process.env.PORT;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at PORT: ${PORT} and http://localhost:${PORT}`);
  });
});
