import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import path from "path"

export default defineConfig({
	plugins: [react()],
	server: {
		host: true,
		port: 5173,
	},
	resolve: {
		alias: {
			"@assets": path.resolve(__dirname, "src/assets"),
			"@atoms": path.resolve(__dirname, "src/atoms"),
			"@molecules": path.resolve(__dirname, "src/molecules"),
			"@organisms": path.resolve(__dirname, "src/organisms"),
			"@templates": path.resolve(__dirname, "src/templates"),
			"@hooks": path.resolve(__dirname, "src/hooks"),
			"@store": path.resolve(__dirname, "src/store"),
			"@config": path.resolve(__dirname, "src/config"),
		},
	},
})
