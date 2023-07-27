# Webcrawler Project

## Introduction

Webcrawler is a web scraping tool built with JavaScript that allows you to crawl websites and extract all subdomains relative to the original url. This project aims to provide the simplest crawler for beginners as a reference.

## Features

- extract relative subdomains(fuzzing)
- calculating the number of hits each subdomain appears
- Save the extracted data as a report in JSON format

## Installation

1. Install Node Version Manager (NVM) using the following command:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/vX.X.X/install.sh | bash
```

2. Install Node.js using NVM:

```bash

nvm install node
```
3. Clone the repository:

```bash

git clone https://github.com/Padfoots/webcrawlerhttp.git
cd webcrawlerhttp
```
4. Install dependencies:

```bash

npm install
```
5. running with the website you want to crawl
  ```bash

nvm run start <website_url>
```
