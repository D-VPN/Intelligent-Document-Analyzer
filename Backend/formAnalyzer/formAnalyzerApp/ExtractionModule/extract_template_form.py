from .extraction_api import API

# extract keys for template form
def ExtractTemplateForm(img):
    res = API(img, key_value_both=False)
    return res
