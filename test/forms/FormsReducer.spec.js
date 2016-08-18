import {expect} from 'chai';
import FormsReducer from '../../src/forms/FormsReducer';
import * as types from 'forms/FormActions';

describe('FormReducer', () => {
  it('should assign an initial state', () => {
    let state = FormsReducer(undefined, {type: 'FAKE_ACTION'});
    expect(state.activeForm).to.be.null;
    expect(state.activeGallery).to.be.null;
    expect(state.activeSubmission).to.be.null;
    expect(state.answerBeingEdited).to.be.null;
    expect(state.answerList).to.deep.equal([]);
    expect(state.editableAnswer).to.be.empty;
    expect(state.editableAnswer).to.be.a('string');
    expect(state.editablePii).to.be.empty;
    expect(state.editablePii).to.be.instanceof(Array);
    expect(state.editAccess).to.be.empty;
    expect(state.form).to.be.null;
    expect(state.formCreationError).to.be.null;
    expect(state.formCounts).to.deep.equal({
      totalSearch: 0,
      totalSubmissions: 0,
      bookmarked: 0,
      flagged: 0
    });
    expect(state.formList).to.be.empty;
    expect(state.galleryCode).to.be.empty;
    expect(state.galleryCode).to.be.instanceof(Array);
    expect(state.galleryList).to.deep.equal([]);
    expect(state.galleryUrls).to.deep.equal([]);
    expect(state.loadingAnswerEdit).to.be.false;
    expect(state.loadingGallery).to.be.false;
    expect(state.savedForm).to.be.null;
    expect(state.savingForm).to.be.false;
    expect(state.submissionFilterBy).to.equal('default');
    expect(state.submissionList).to.deep.equal([]);
    expect(state.submissionOrder).to.equal('dsc');
    expect(state.submissionSearch).to.be.empty;
    expect(state.submissionSearch).to.be.a('string');
    expect(state.widgets).to.deep.equal([]);
  });

  it('should update the form settings', () => {

  });

  it('should update the form header', () => {

  });

  it('should update the form footer', () => {

  });

  it('should update the form finished screen', () => {

  });
});