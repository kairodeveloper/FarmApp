import React, { PureComponent } from 'react';
import { MaskService } from 'react-native-masked-text';
import { TextInput } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Touchable, InputAction } from './styled';
import styles, { tintColor, textColor } from './styles';

class InputSimple extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.input = React.createRef();
  }

  focus() {
    this.input.current.focus();
  }

  renderAccessory = () => {
    const { action } = this.props;

    if (action) {
      return (
        <Touchable onPress={action.handler}>
          <InputAction>
            <MaterialCommunityIcons name={action.name} size={24} color={tintColor} />
          </InputAction>
        </Touchable>
      );
    }

    return null;
  };

  render() {
    const { mask, value, error, options, label } = this.props;
    const optionsCopy = options || {};
    const inputValue = mask ? MaskService.toMask(mask, value || '', optionsCopy) : value;

    return (
      <TextInput
        ref={this.input}
        textColor={tintColor}
        tintColor={tintColor}
        baseColor={tintColor}
        labelTextStyle={styles.label}
        clearTextOnFocus={false}
        titleTextStyle={error ? styles.error : styles.title}
        style={styles.text}
        {...this.props}
        value={inputValue}
        renderAccessory={this.renderAccessory}
        labelHeight={13}
        containerStyle={{
          alignSelf: 'center'
        }}
      />
    );
  }
}

export default InputSimple;
