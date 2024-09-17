import React, { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export const TextEditor = ({ content, setContent, commentSubmitBtn, commentbtn = true, editbtn = false, editSubmitBtn, editingCommentId, inputVisible }) => {

    const [showBtn, setShowBtn] = useState(commentbtn);
    const [showEditBtn, setShowEditBtn] = useState(editbtn);

    useEffect(() => {
        // console.log(btn);
        setShowBtn(commentbtn);
    }, [commentbtn]);

    useEffect(() => {
        // console.log(editbtn);
        setShowEditBtn(editbtn);
    }, [editbtn]);

    return (
        <div>
            <Editor
                value={content}
                apiKey="clz07tkk58muxu1e8xg4x87nou5gawu07mfycuw2rpygdx53"
                init={{
                    height: 150,
                    autosave_ask_before_unload: false,
                    powerpaste_allow_local_images: true,
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
                    image_caption: true,
                    noneditable_noneditable_class: 'mceNonEditable',
                    toolbar_mode: 'sliding',
                    tinycomments_mode: 'embedded',
                    contextmenu: 'link image imagetools table configurepermanentpen',
                    resize: true,
                    menubar: false,
                    plugins: [
                        'lists', 'link', 'image', 'charmap', 'emoticons', 'code', 'fullscreen', 'mentions'
                    ],
                    toolbar:
                        'styleselect | bold italic underline | bullist numlist | forecolor | link image | emoticons charmap | code fullscreen | addcomment',
                    spellchecker_dialog: true,
                    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
                }}
                onEditorChange={(comment) => setContent(comment)}
            />
            {showBtn ? (
                <div>
                    <button
                        onClick={commentSubmitBtn}
                        className="px-4 py-1 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Add
                    </button>
                    <button
                        type="button"
                        onClick={inputVisible}
                        className="px-3 ml-2 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                </div>
            ) : showEditBtn ? (
                <div className="flex space-x-2 mt-2">
                    <button onClick={editSubmitBtn} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Save
                    </button>
                    <button
                        type="button"
                        onClick={() => editingCommentId(null)}
                        className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                </div>
            ) : null}
            {/* {content} */}
        </div>
    );
};