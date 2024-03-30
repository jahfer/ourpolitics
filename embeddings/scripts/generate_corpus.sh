#!/bin/sh

JSON_PATH="../../www/data/policies/2015/policies.json"
CORPUS_PATH="../out/corpus.txt"

jq '.[] | "clustering: [\(.topic)][\(.year)][\(.party)] \(.title.EN)"' $JSON_PATH > corpus.txt