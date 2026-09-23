FROM oven/bun:1.4.2

WORKDIR /app

COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

ARG MAKEFILE2DOC_VERSION=0.1.3
ARG TARGETARCH
RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates curl \
    && if [ "$TARGETARCH" = "amd64" ]; then \
        curl -fsSL "https://github.com/Merlin-Clos/makefile2doc/releases/download/v${MAKEFILE2DOC_VERSION}/makefile2doc-linux-amd64" -o /usr/local/bin/makefile2doc; \
        echo 'b654e487bf9057b756665fba47e7bb04370bc80646f30c906b3db2e1033c97de  /usr/local/bin/makefile2doc' | sha256sum -c -; \
        chmod +x /usr/local/bin/makefile2doc; \
    else \
        echo "Skipping makefile2doc: no Linux ${TARGETARCH} release binary"; \
    fi \
    && apt-get purge -y curl \
    && apt-get autoremove -y \
    && rm -rf /var/lib/apt/lists/*

COPY . .

EXPOSE 5173
ENTRYPOINT ["sh", "-c", "bun install --frozen-lockfile && exec \"$@\"", "--"]
CMD ["bun", "run", "dev", "--host", "0.0.0.0"]
