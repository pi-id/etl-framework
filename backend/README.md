# Bitne napomene

1. Učinjene su blage izmjene nad bazom podataka 'ADM_Configuration'. Sve tablice iz 'meta' scheme prebačene su u pretpostavljenu schemu 'dbo'. Te su tablice također preimenovane tako da im je dodan prefix 'meta'. Skripta kojom se to izvodi je 'database_update.sql'.

2. Vjerodajnice za pristup bazi podataka nalaze se u datoteci 'settings.py' u direktoriju 'base' pod varijablom 'DATABASES'.
*Pretpostavka je da u bazi podataka postoji korisnik 'student1' s lozinkom 'student1234'*.

3. Django projekt se pokreće iz naddirektorija 'backend' unutar kojeg se nalazi istoimeni direktorij 'backend', zajedno s direktorijem 'base'.
Automatsko generiranje modela iz postojeće baze podataka radi se pomoću naredbe 'python manage.py inspectdb > backend/models.py'.
Nakon svake izmjene modela u datoteci backend/models.py potrebno je pokrenuti sljedeće naredbe:
1. 'python manage.py makemigrations'
2. 'python manage.py migrate'.

Django poslužitelj se pokreće naredbom
'python manage.py runserver'.

4. Svi potrebni paketi nalaze se unutar virtualnog okruženja koje je spremljeno u konfiguracijskoj datoteci 'environment.yml'.
Virtualno okruženje (venv) je naziva 'praksa', a naredba koja će instalirati to virtualno okruženje iz datoteke 'environment.yml' je
'conda env create -f environment.yml'. Nakon izvođenja te naredbe potrebno je izvesti naredbu 'conda activate praksa'.
Ne smije se ažurirati Django verzija na najnoviju jer će to uzrokovati probleme s paketima koji omogućavaju vezu
s MS SQL Serverom.

5. Potrebno je izvršiti skriptu 'domain_script.sql' da bi se u bazu podataka stvorile i napunile tablice 'domain_directory' i
'domain_value'.

6. Dobro pogledati datoteku _backend/urls.py_
i pripaziti na oblike URL-ova.
Posebno pripaziti na slanje parametera,
npr. kod brisanja batchova
"batches/?ids=100,101,102".
Parametar "ids" se ne vidi u datoteci _urls.py_ zato što je opcionalan, ali se može vidjeti u datoteci _views.py_,
konkretno u liniji "ids = self.request.query_params.get('ids', None)".
