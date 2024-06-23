import { Input } from "@/components/ui/input";

export const FormElement = ({ controlItem, value, onChange }) => {
    let content = null;
    
    switch (controlItem?.componentType) {
        // case 'select':

        default:
            content = <Input
                id={controlItem?.name}
                name={controlItem?.name}
                className="sm:col-span-3 md:col-span-2 lg:col-span-1"
                placeholder={controlItem?.placeholder}
                value={value}
                onChange={onChange}
                type={controlItem.type}
            />
            break;
    }
    return content;
}