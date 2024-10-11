# Makefile for a React + TypeScript + Vite project

# Directory settings
SRC_DIR := src
DIST_DIR := dist

# Command shortcuts
RM := rm -rf
MKDIR := mkdir -p

# npm script commands
DEV := npm run dev
BUILD := npm run build
SERVE := npm run serve
DEPS := npm install
TREE := tree -I "node_modules"

# File targets
DIRECTORY_TREE := directory_tree.txt

.PHONY: install clean dev build serve tree

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
