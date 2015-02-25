// Generated by CoffeeScript 1.6.3
/*
Associated with "form_builder.scss"

BEM:
block:
  "formb" #formbuilder
elems:
  "surveybuttons" #
*/

var CENSUS_TEXTS, contents, drag_placeholder_row, empty_survey_message, li_row, loremipsum, sidenote, standard_row;

this.sandbox = function(el) {
  var $wrap;
  $wrap = $($.parseHTML(contents()));
  $(el).html($wrap);
  $('body').on('click', 'ul.card__settings__tabs li:not(.heading)', function(evt) {
    var $et, tabId;
    $et = $(evt.target);
    tabId = $et.data('cardSettingsTabId');
    $et.parent('ul').find('.active').removeClass('active');
    $et.addClass('active');
    $et.parents('.card__settings').find(".card__settings__fields.active").removeClass('active');
    return $et.parents('.card__settings').find(".card__settings__fields--" + tabId).addClass('active');
  });
  $('body').on('mouseenter', '.card__buttons .card__buttons__button', function(evt) {
    var $et, bColor, bText;
    $et = $(evt.target);
    bColor = $(this).data('buttonColor');
    bText = $(this).data('buttonText');
    $et.parents('.card__buttons').addClass('noborder');
    $et.parents('.card__header').append('<div class="bg">');
    return $et.parents('.card__header').find('.bg').addClass("" + bColor).html("<span>" + bText + "</span>");
  });
  $('body').on('mouseleave', '.card__buttons .card__buttons__button', function(evt) {
    var $et;
    $et = $(evt.target);
    $et.parents('.card__buttons').removeClass('noborder');
    return $et.parents('.card__header').find('.bg').remove();
  });
  return ;
};

contents = function() {
  /*
  the form builder is contained within a <section>
  */

  return "<div class=\"survey-header\">\n  SurveyHeader\n</div>\n<div class=\"container\">\n<section class=\"-form-builder form-builder\">\n  <div class=\"formb__surveybuttons\"></div>\n  <div class=\"survey-editor\">\n    <ul>\n      " + (empty_survey_message()) + "\n      " + (li_row('text')) + "\n      " + (li_row('longtext')) + "\n      " + (li_row('number')) + "\n      " + (li_row('indrag')) + "\n      " + (li_row('dragplaceholder')) + "\n    </ul>\n  </div>\n</section>\n</div>";
};

CENSUS_TEXTS = {
  integer: "How many people were living or staying in this house, apartment, or mobile home on April 1, 2010?",
  select1yn: "Were there any additional people staying here April 1, 2010 that you did not include in Question 1?",
  select1: "Is this house, apartment, or mobile home: owned with mortgage, owned without mortgage, rented, occupied without rent?",
  text: "What is your telephone number?"
};

/*
  ["integer","q1","How many people were living or staying in this house, apartment, or mobile home on April 1, 2010?"
  ,"select_one yes_no","q2","Were there any additional people staying here April 1, 2010 that you did not include in Question 1?"
  ,"select_one ownership_type or_other","q3","Is this house, apartment, or mobile home: owned with mortgage, owned without mortgage, rented, occupied without rent?"
  ,"text","q4","What is your telephone number?"
  ,"text","q5","Please provide information for each person living here. Start with a person here who owns or rents this house, apartment, or mobile home. If the owner or renter lives somewhere else, start with any adult living here. This will be Person 1. What is Person 1's name?"
  ,"select_one male_female","q6","What is Person 1's sex?"
  ,"date","q7","What is Person 1's age and Date of Birth?"
*/


loremipsum = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.";

li_row = function(variation) {
  var note;
  if (variation == null) {
    variation = 'text';
  }
  note = "card preview <strong><code>:" + variation + "</code></strong>";
  if (variation === 'dragplaceholder') {
    return drag_placeholder_row({
      note: note
    });
  } else {
    return standard_row(variation, {
      note: note
    });
  }
};

drag_placeholder_row = function(_arg) {
  var note;
  note = _arg.note;
  return "<li class=\"xlf-row-view\">\n  " + (sidenote(note, 'absrt')) + "\n  <div class=\"card--placeholder\">\n      <span>Drag and drop to reorder</span>\n  </div>\n</li>";
};

standard_row = function(variation, _arg) {
  var card__butons, card__indicator, note, _text;
  if (variation == null) {
    variation = 'text';
  }
  note = _arg.note;
  _text = variation === 'text' || variation === 'indrag' ? CENSUS_TEXTS.text : variation === 'longtext' ? loremipsum : variation === 'number' ? CENSUS_TEXTS.integer : "<i>no text for <code>:" + variation + "</code></i>";
  card__indicator = "<div class=\"card__indicator\">\n  <div class=\"noop card__indicator__icon\"><i class=\"fa fa-list\"></i></div>\n</div>";
  card__butons = "<div class=\"card__buttons\">\n  <a href=\"#\" class=\"card__buttons__button card__buttons__button--settings gray js-advanced-toggle js-toggle-row-settings\" data-button-color=\"gray\" data-button-text=\"Settings\"><i class=\"fa fa-cog\"></i></a>\n  <a href=\"#\" class=\"card__buttons__button red\" data-button-color=\"red\" data-button-text=\"Delete Question\"><i class=\"fa fa-trash-o\"></i></a>\n  <a href=\"#\" class=\"card__buttons__button blue\" data-button-color=\"blue\" data-button-text=\"Duplicate Question\"><i class=\"fa fa-copy\"></i></a>\n</div>";
  return "<li class=\"xlf-row-view\">\n  " + (sidenote(note, 'absrt')) + "\n\n  <div class=\"card card--expandedsettings\">\n    <div class=\"card__header\">\n      " + card__indicator + "\n      <div class=\"card__text\">\n        " + _text + "\n      </div>\n      \n      " + card__butons + "\n    </div>\n    <div class=\"card__settings card__settings--question-options\">\n      <ul class=\"card__settings__tabs\">\n        <li class=\"heading\"><i class=\"fa fa-cog\"></i> Settings</li>\n        <li class=\"active\" data-card-settings-tab-id=\"question-options\">Question Options</li>\n        <li data-card-settings-tab-id=\"skip-logic\">Skip Logic</li>\n        <li data-card-settings-tab-id=\"validation-criteria\">Validation Criteria</li>\n        <li data-card-settings-tab-id=\"response-type\">Response Type</li>\n      </ul>\n      <div class=\"card__settings__content clearfix\">\n        <ul class=\"card__settings__fields card__settings__fields--question-options active\">\n          <li class=\"card__settings__fields__field\"><label>Question Hint: </label> <span class=\"settings__input\"><input type=\"text\" name=\"hint\" class=\"text\" /></span></li>\n          <li class=\"card__settings__fields__field\"><label>Required: </label> <span class=\"settings__input\"><input type=\"checkbox\" name=\"required\"/> Yes</span></li>\n          <li class=\"card__settings__fields__field\"><label>Default: </label> <span class=\"settings__input\"><input type=\"text\" name=\"default\" class=\"text\"/></span></li>\n        </ul>\n\n        <ul class=\"card__settings__fields card__settings__fields--skip-logic\">\n          <li class=\"card__settings__fields__field\"><button class=\"skiplogic__button skiplogic__select-builder\"><i class=\"fa fa-plus\"></i> Add a condition</button></li>\n          <li class=\"card__settings__fields__field\"><button class=\"skiplogic__button skiplogic__select-handcode\"><i class=\"fa fa-code\"></i> Manually enter your skip logic in XLSForm code</button></li>\n        </ul>\n\n        <ul class=\"card__settings__fields card__settings__fields--validation-criteria\">\n          <li class=\"card__settings__fields__field\">Validation criteria will go here</li>\n        </ul>\n\n        <ul class=\"card__settings__fields card__settings__fields--response-type\">\n          <li class=\"card__settings__fields__field\">Response type will go here</li>\n        </ul>\n\n      </div>\n    </div>\n  </div>\n</li>";
};

empty_survey_message = function() {
  /*
  The empty survey message is an empty <li>
  */

  var note;
  note = "When the survey is empty, this is the only item shown.";
  return "<li class=\"survey-editor__null-top-row\">\n  " + (sidenote(note, 'absrt')) + "\n\n  <p class=\"survey-editor__message well\">\n    <b>This form is currently empty.</b>\n    <br>\n    <a href=\"#\">Add your first question now</a>\n  </p>\n</li>";
};

sidenote = function(msg, styling_variation) {
  if (styling_variation == null) {
    styling_variation = 'inline-block';
  }
  return "<div class=\"sidenote-wrap-" + styling_variation + "\">\n  <div class=\"sidenote\">\n    " + msg + "\n  </div>\n</div>";
};