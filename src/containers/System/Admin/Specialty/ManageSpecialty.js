import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./ManageSpecialty.scss"
import { languages, dateFormat, CommonUtils } from "../../../../utils"
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import { postSpecialtyInformation } from "../../../../services/userService"
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
const mdParser = new MarkdownIt


class ManageSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nameSpecialty: '',
            imgSpecialty: '',
            descriptionHTML: '',
            descriptionMarkdown: '',

        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    onChangeValue = (e, input) => {
        let copyState = { ...this.state }
        copyState[input] = e.target.value
        this.setState({
            ...copyState
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text
        })
    }

    handleOnChangeImg = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file); //Chuyển ảnh sang dạng base64
            this.setState({
                imgSpecialty: base64
            })
        }
    }

    handleSaveInfo = async () => {
        let res = await postSpecialtyInformation({
            nameSpecialty: this.state.nameSpecialty,
            imgSpecialty: this.state.imgSpecialty,
            descriptionHTML: this.state.descriptionHTML,
            descriptionMarkdown: this.state.descriptionMarkdown
        })
        if (res && res.errCode === 0) {
            toast.success('Save specialty information success')
        } else {
            toast.error('Save specialty information faillll')
        }
    }


    render() {
        return (
            <div className="manage-speciaty-container">
                <h1 className='title'><FormattedMessage id="specialty-manage.title"></FormattedMessage></h1>
                <div className='container'>
                    <div className='row'>
                        <div className='input-body form-group col-6'>
                            <label><FormattedMessage id="specialty-manage.name-specialty"></FormattedMessage></label>
                            <input className='form-control' type='text' value={this.state.nameSpecialty} onChange={(e) => this.onChangeValue(e, 'nameSpecialty')} />
                        </div>
                        <div className='input-body form-group col-6'>
                            <label><FormattedMessage id="specialty-manage.image-specialty"></FormattedMessage></label>
                            <input id='upload-Img' className='form-control' type='file' onChange={(e) => this.handleOnChangeImg(e)} />
                        </div>
                    </div>

                    <div className='markdown'>
                        <MdEditor style={{ height: '500px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <button className='btn-primary btn' onClick={() => this.handleSaveInfo()}><FormattedMessage id="specialty-manage.button-save"></FormattedMessage></button>
                </div>
            </div>
        )
    }

}




const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
