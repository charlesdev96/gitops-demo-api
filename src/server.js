const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/health", (_req, res) => {
	res.status(200).json({ status: "ok" });
});

app.get("/", (_req, res) => {
	res.status(200).json({
		message: "Hello, assignement for charles ogonnaya. Congratulations",
	});
});

// Keep the app importable by tests without starting a listener.
if (require.main === module) {
	app.listen(PORT, "0.0.0.0", () => {
		console.log(`Server running on port ${PORT}`);
	});
}

module.exports = app;

