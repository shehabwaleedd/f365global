import React, { useEffect } from "react";
import { Field, ErrorMessage } from "formik";
import styles from '../unified.module.scss';
import { CustomFieldProps } from "@/types/common";
import { format } from 'date-fns';
import { toast } from "sonner";
import { useFormikContext } from 'formik';

const CustomField: React.FC<CustomFieldProps> = ({ name, label, fieldType = "input", setFieldValue, options, onChange }) => {
    const { errors, touched } = useFormikContext();
    useEffect(() => {
        if (touched[name as keyof typeof touched] && errors[name as keyof typeof errors]) {
            toast.error(errors[name as keyof typeof errors]);
        }
    }, [touched, errors, name]);
    
    if (fieldType === "file") {
        return (
            <div className={styles.formField}>
                <label htmlFor={name}>{label}</label>
                <input
                    id={name}
                    name={name}
                    type="file"
                    onChange={onChange}
                    accept="image/*"
                    multiple={name === "images"}
                />
            </div>
        );
    } else if (fieldType === "select" && options) {
        return (
            <div className={styles.formField}>
                <label htmlFor={name}>{label}</label>
                <Field as="select" name={name}>
                    <option value="">Select {label}</option>
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                    ))}
                </Field>
            </div>
        );
    } else if (fieldType === "date") {
        const today = format(new Date(), 'yyyy-MM-dd');
        return (
            <div className={styles.formField}>
                <label htmlFor={name}>{label}</label>
                <Field as="input" type="date" name={name} min={today} />
            </div>
        );
    } else {
        return (
            <div className={styles.formField}>
                <label htmlFor={name}>{label}</label>
                {fieldType === "textarea" ? (
                    <Field as="textarea" id={name} name={name}
                        placeholder={label}
                    />
                ) : (
                    <Field id={name} name={name} type={fieldType}
                        placeholder={label}
                    />
                )}
            </div>
        );
    }
};

export default CustomField;