import React from 'react';

const ExampleFirst = () => {
    if (this.props.editorMode) {
        return (
            <div className={styles.Container}>
                <div className={styles.image}>
                    <Image />
                    <DeleteUploadControls/>
                </div>
            </div>
        );
    }
    return (
        <div className={styles.Container}>
                <Image />
        </div>
    );
};

export default ExampleFirst;