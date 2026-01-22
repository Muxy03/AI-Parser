PARSER_DIR := "AI-Parser/Practical-Solution/"
DEMO_DIR := "Demo"
TEST_SET := $(shell find TestSet -type f -name "*.html" -o -name "*.md" | sort)

all: report.pdf

report.pdf: Report/report.tex
	pdflatex -output-directory=Report Report/report.tex

build:
	npm --prefix ${PARSER_DIR} install
	npm --prefix ${PARSER_DIR} run build

test: ${TEST_SET}
	node ${DEMO_DIR}/test.js ${TEST_SET}
	python3 -m http.server 8000

clean:

	rm -rf Report/report.lol Report/report.aux Report/report.log Report/report.out Report/report.toc Report/report.synctex.gz Report/report.fdb_latexmk Report/report.fls Report/_minted AI-Parser/Practical-Solution/node_modules AI-Parser/Practical-Solution/dist AI-Parser/Practical-Solution/output.html Demo/Reports/ Demo/Actual/

.PHONY: all test clean build