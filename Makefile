# Makefile for a React + TypeScript + Vite project

# Directory settings
SRC_DIR := src
DIST_DIR := dist

# Command shortcuts
RM := rm -rf
MKDIR := mkdir -p

# npm script commands
DEV := npm start
BUILD := npm run build
SERVE := npm run preview
DEPS := npm install
FORMAT := npm run format
LINT := npm run lint
TREE := tree -I "node_modules"

# File targets
DIRECTORY_TREE := directory_tree.txt

.PHONY: install clean dev build serve tree format lint

# Install all dependencies
install:
	$(DEPS)

# Run the development server
dev:
	$(DEV)

# Build the project
build:
	$(BUILD)

# Serve the build directory
serve:
	$(SERVE)

# Format code with Prettier
format:
	$(FORMAT)

# Lint code with ESLint
lint:
	$(LINT)

# Generate directory tree
tree:
	$(TREE) > $(DIRECTORY_TREE)

tree_windows:
	tree /F /A src | findstr /V /C:"node_modules" | findstr /V /C:".bin" | findstr /V /C:"package-lock.json" | findstr /V /C:"vite.config.ts" > directory_tree.txt

# Clean the distribution directory
clean:
	$(RM) $(DIST_DIR)

# Helper to create necessary directories
dirs:
	$(MKDIR) $(SRC_DIR) $(DIST_DIR)

# Default action is to install and build
all: install build
