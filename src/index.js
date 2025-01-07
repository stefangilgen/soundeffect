const { addFilter } = wp.hooks;
const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls, MediaUpload } = wp.blockEditor;
const { PanelBody, Button } = wp.components;

// Registriere die Attribute für den Block
addFilter(
    'blocks.registerBlockType',
    'soundeffect/add-attributes',
    (settings, name) => {
        if (name !== 'core/image') {
            return settings;
        }

        return {
            ...settings,
            attributes: {
                ...settings.attributes,
                soundEffect: {
                    type: 'string',
                    default: ''
                },
                soundEffectName: {
                    type: 'string',
                    default: ''
                }
            }
        };
    }
);

// Erweitere den Block um die Sound-Funktionalität
const withSoundEffect = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        if (props.name !== 'core/image') {
            return <BlockEdit {...props} />;
        }

        const { attributes, setAttributes } = props;

        return (
            <Fragment>
                <BlockEdit {...props} />
                <InspectorControls>
                    <PanelBody title="Soundeffekt Einstellungen">
                        <MediaUpload
                            onSelect={(media) => {
                                console.log('Selected media:', media);
                                setAttributes({
                                    soundEffect: media.url,
                                    soundEffectName: media.title || 
                                                   media.description || 
                                                   media.filename || 
                                                   document.querySelector(`[id="attachment-details-title-${media.id}"]`)?.value || 
                                                   'Unbenannt'
                                });
                            }}
                            allowedTypes={['audio']}
                            value={attributes.soundEffect}
                            render={({ open }) => (
                                <div>
                                    <Button 
                                        onClick={open}
                                        isPrimary
                                    >
                                        {attributes.soundEffect ? 'Sound ändern' : 'Sound hinzufügen'}
                                    </Button>
                                    
                                    {attributes.soundEffect && (
                                        <>
                                            <Button 
                                                onClick={() => setAttributes({ 
                                                    soundEffect: '',
                                                    soundEffectName: '' 
                                                })}
                                                isSecondary
                                                style={{ marginLeft: '8px' }}
                                            >
                                                Sound entfernen
                                            </Button>
                                            
                                            <div style={{ marginTop: '12px', marginBottom: '8px' }}>
                                                <strong>Ausgewählter Sound:</strong>
                                                <p style={{ margin: '4px 0' }}>
                                                    {attributes.soundEffectName || 'Unbenannt'}
                                                </p>
                                            </div>
                                            
                                            <div>
                                                <audio controls style={{ width: '100%' }}>
                                                    <source src={attributes.soundEffect} />
                                                </audio>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        />
                    </PanelBody>
                </InspectorControls>
            </Fragment>
        );
    };
}, 'withSoundEffect');

addFilter(
    'editor.BlockEdit',
    'soundeffect/with-sound-effect',
    withSoundEffect
);

// Füge das data-Attribut zum HTML-Output hinzu
addFilter(
    'blocks.getSaveContent.extraProps',
    'soundeffect/save-props',
    (extraProps, blockType, attributes) => {
        if (blockType.name !== 'core/image') {
            return extraProps;
        }

        if (attributes.soundEffect) {
            extraProps['data-sound-effect'] = attributes.soundEffect;
        }

        return extraProps;
    }
);

// Modifiziere den Block-Output
addFilter(
    'blocks.getSaveElement',
    'soundeffect/save-element',
    (element, blockType, attributes) => {
        if (blockType.name !== 'core/image') {
            return element;
        }

        // Debug
        console.log('Save Element:', element);
        console.log('Attributes:', attributes);

        if (!attributes.soundEffect) {
            return element;
        }

        return wp.element.cloneElement(element, {
            ...element.props,
            'data-sound-effect': attributes.soundEffect
        });
    }
);

// Registriere das Attribut für den Block
wp.blocks.registerBlockType('core/image', {
    ...wp.blocks.getBlockType('core/image'),
    attributes: {
        ...wp.blocks.getBlockType('core/image').attributes,
        soundEffect: {
            type: 'string',
            source: 'attribute',
            selector: 'img',
            attribute: 'data-sound-effect'
        }
    }
}); 