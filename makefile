all: report.pdf

report.pdf: Report/report.tex
	pdflatex -output-directory=Report Report/report.tex
	make clean


clean:
	rm -f Report/report.aux Report/report.log Report/report.out Report/report.toc Report/report.synctex.gz Report/report.fdb_latexmk Report/report.fls Report/_minted