from django.core.management.base import BaseCommand, CommandError
from dkobo.koboform.models import SurveyDraft
from django.contrib.auth.models import User
from django.conf import settings
import datetime
import sys

import StringIO
import pyxform
import csv

LIMIT_IMPORTS = 25
ASSET_TYPE = "question"

def _dict_to_csv(imported_sheets):
    foo = StringIO.StringIO()
    writer = csv.writer(
        foo, quotechar='"', doublequote=True, escapechar='\\', delimiter=',', quoting=csv.QUOTE_ALL)
    for sheet_name, rows in imported_sheets.items():
        writer.writerow([sheet_name])
        out_keys = []
        out_rows = []
        for row in rows:
            out_row = []
            for key in row.keys():
                if key not in out_keys:
                    out_keys.append(key.encode("UTF-8"))
            for out_key in out_keys:
                out_row.append(row.get(out_key, "").encode("UTF-8"))
            out_rows.append(out_row)
        writer.writerow([None] + out_keys)
        for out_row in out_rows:
            writer.writerow([None] + out_row)
    return foo.getvalue()

def _convert_xls_file_to_individual_surveys(filename):
    imported_sheets = pyxform.xls2json_backends.xls_to_dict(filename)
    out_array = []
    survey = imported_sheets.get("survey", [])
    choices = imported_sheets.get("choices", [])
    # for row in survey:
    for row in survey[0:LIMIT_IMPORTS]:
        if len(row.keys()) == 0:
            continue
        name = row.get("name")
        survey_dict = {'survey': [row]}

        if len(choices) > 0:
            survey_dict['choices'] = choices

        out_array.append(
            (name, _dict_to_csv(survey_dict),)
            )
    return out_array

class Command(BaseCommand):
    def handle(self, *args, **options):
        username = args[0]
        filename = args[1]
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist, e:
            sys.exit(1)
        print user.survey_drafts.count()

        ### goes with survey_drafts
        user.survey_drafts.filter(asset_type=ASSET_TYPE).delete()
        asset_type = None
        ##

        for (name, csvstr) in _convert_xls_file_to_individual_surveys(filename):
            try:
                SurveyDraft.objects.create(user=user, name=name, body=csvstr, asset_type=ASSET_TYPE)
            except Exception, e:
                print "Couldn't import asset"
        print user.survey_drafts.count()