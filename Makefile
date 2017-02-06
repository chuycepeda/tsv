default: build

# Build for the default architecture in use
build:
	go build -v

# Redownload all dependencies
clean:
	rm -rf vendor glide.lock
	glide install

# Run as a native CLI
run:
	./tsv server

# Build server for Linux and pack it with the contents
docker:
	env GOOS=linux GOARCH=amd64 go build -v -o tsv
	docker build -t tm/tsv .
	docker save -o tsv.tar tm/tsv
	gzip tsv.tar
	rm tsv

# Landing page build
landing:
	mv htdocs/index.html htdocs/backup.up
	mv htdocs/landing.html htdocs/index.html
	make docker
	mv htdocs/index.html htdocs/landing.html
	mv htdocs/backup.up htdocs/index.html

# Run as a docker container
run-docker:
	docker run -it -p 7788:7788 --rm \
	-v /var/run/tsv-pre-register:/data/pre-register \
	tm/tsv server -s /data -c /var/www/htdocs
