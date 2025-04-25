.PHONY: app deps db tests

app: 
	python3 run.py

deps: 
	python3 -m pip install -r requirements.txt

db:
	[ -f db.sqlite3 ] && rm db.sqlite3 || true
	python3 db/setup.py db/init_toronto_database.sql

tests: 
	python3 -m unittest discover -s tests -p "*.py"

clean:
	rm db.sqlite3