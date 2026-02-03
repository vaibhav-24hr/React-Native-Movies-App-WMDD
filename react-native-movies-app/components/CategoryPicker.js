// Inline dropdown - NO Modal, NO native Picker (avoids String/Boolean cast on Android)
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const CategoryPicker = ({ selectedValue, onValueChange, options, style }) => {
  const [open, setOpen] = useState(false);

  const selectedOption = options.find((o) => o.value === selectedValue);
  const label = selectedOption ? selectedOption.label : String(selectedValue);

  const onSelect = (value) => {
    onValueChange(value);
    setOpen(false);
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={styles.trigger}
        onPress={() => setOpen(!open)}
        activeOpacity={0.7}
      >
        <Text style={styles.triggerText}>{label}</Text>
        <Text style={styles.arrow}>{open ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {open ? (
        <View style={styles.optionsBox}>
          <ScrollView
            style={styles.optionsScroll}
            nestedScrollEnabled
            keyboardShouldPersistTaps="handled"
          >
            {options.map((item) => (
              <TouchableOpacity
                key={String(item.value)}
                style={[
                  styles.optionRow,
                  item.value === selectedValue && styles.optionRowSelected,
                ]}
                onPress={() => onSelect(item.value)}
              >
                <Text
                  style={[
                    styles.optionText,
                    item.value === selectedValue && styles.optionTextSelected,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    paddingHorizontal: 12,
  },
  triggerText: {
    fontSize: 16,
    color: '#333',
  },
  arrow: {
    fontSize: 12,
    color: '#666',
  },
  optionsBox: {
    maxHeight: 200,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  optionsScroll: {
    maxHeight: 200,
  },
  optionRow: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  optionRowSelected: {
    backgroundColor: '#f0f9fa',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  optionTextSelected: {
    fontWeight: '600',
    color: '#2d4f5c',
  },
});

export default CategoryPicker;
