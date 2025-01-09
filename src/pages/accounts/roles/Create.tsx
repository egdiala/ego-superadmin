import React, { useMemo } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { Permission } from "@/types/roles";
import { createRoleSchema } from "@/validations/roles";
import { Loader } from "@/components/core/Button/Loader";
import { pageVariants } from "@/constants/animateVariants";
import { useGetRoleLists } from "@/services/hooks/queries";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { Breadcrumb, Button, Checkbox, Input, RenderIf } from "@/components/core";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { useCreateRole } from "@/services/hooks/mutations";
import { removeEmptyArrays } from "@/utils/textFormatter";

export const CreateRolePage: React.FC = () => {
    const navigate = useNavigate()
    const { data, isFetching } = useGetRoleLists()
    const { mutate: createRole, isPending } = useCreateRole(() => navigate("/accounts/roles"))

    const { errors, handleSubmit, isValid, register, setFieldValue, values } = useFormikWrapper({
        initialValues: {
            name: "",
            role_list: {
                create: [],
                read: [],
                update: [],
                delete: [],
            },
        },
        validationSchema: createRoleSchema,
        onSubmit: () => {
            createRole(removeEmptyArrays(values))
        },
    });

    const permissions = useMemo(() => {
        return [
            {
                label: "Create",
                items: data?.filter((item) => item?.action?.includes("create")).map((item) => ({ key: item?.key, tag: item?.tag })).sort((a,b) => b?.key?.toLowerCase() < a?.key?.toLowerCase() ? 1 : -1) || []
            },
            {
                label: "Read",
                items: data?.filter((item) => item?.action?.includes("read")).map((item) => ({ key: item?.key, tag: item?.tag })).sort((a,b) => b?.key?.toLowerCase() < a?.key?.toLowerCase() ? 1 : -1) || []
            },
            {
                label: "Update",
                items: data?.filter((item) => item?.action?.includes("update")).map((item) => ({ key: item?.key, tag: item?.tag })).sort((a,b) => b?.key?.toLowerCase() < a?.key?.toLowerCase() ? 1 : -1) || []
            },
            {
                label: "Delete",
                items: data?.filter((item) => item?.action?.includes("delete")).map((item) => ({ key: item?.key, tag: item?.tag })).sort((a,b) => b?.key?.toLowerCase() < a?.key?.toLowerCase() ? 1 : -1) || []
            },
        ]
    }, [data])

    const handleCheckboxChange = (action: string, value: Permission) => {
        const current = values.role_list[action as keyof typeof values.role_list] as string[];
        const isChecked = current.includes(value.tag);
        const newValues = isChecked ? current.filter((item: string) => item !== value.tag) : [...current, value.tag];

        setFieldValue(`role_list.${action}`, newValues).then(() => {

            // Ensure any permission selected in create, update or delete is also selected in view
            if ((action === "create" || action === "update" || action === "delete") && !isChecked) {
                const foundItems = permissions.filter((permission) => permission?.label?.toLowerCase() === "read")?.[0]?.items
                const foundItem = foundItems.filter((item) => item?.key?.toLowerCase() === value?.key?.toLowerCase())?.[0]
                const uniqueSet = new Set([...values.role_list.read, foundItem.tag]);
                setFieldValue("role_list.read", Array.from(uniqueSet))
            }

        })
    };

    const handleAllCheckboxChange = (action: string, items: Permission[]) => {
        const allSelected = items.every(item => (values.role_list[action as keyof typeof values.role_list] as string[]).includes(item.tag));
        const newValues = allSelected ? [] : items.map(item => item.tag);

        setFieldValue(`role_list.${action}`, newValues).then(() => {

            // Ensure any permission selected in create, update or delete is also selected in view
            if (action === "create" || action === "update" || action === "delete") {
                const viewItems = permissions.filter((permission) => permission?.label?.toLowerCase() === "read")?.[0]?.items
                const itemKeys = items.map((item) => item.key?.toLowerCase())
                const foundViewItems = viewItems.filter((item) => itemKeys.includes(item?.key?.toLowerCase()))?.map((itm) => itm.tag)
                const viewValues = new Set([...values.role_list.read, ...foundViewItems]);
                setFieldValue("role_list.read", Array.from(viewValues));
            }

        })
    }
    
    return (
        <motion.div variants={pageVariants} initial='initial' animate='final' exit={pageVariants.initial} className="flex flex-col gap-2">
            <Breadcrumb items={[{ label: "Roles", link: "/accounts/roles" }, { label: "Add new role", link: "/accounts/roles/create" }]} showBack />
            <RenderIf condition={!isFetching}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-4 rounded-lg">
                <h1 className="font-semibold text-xl">Add New Role</h1>
                <div className="grid p-4 gap-1 bg-amber-50 rounded-2xl w-full 2xl:max-w-screen-2xl">
                    <div className="flex items-center gap-1">
                        <Icon icon="ph:warning-circle-fill" className="size-5 text-amber-800" />
                        <h2 className="font-medium text-base text-amber-800">Alert: Automatic Read Permission Selection</h2>
                    </div>
                    <p className="text-sm text-amber-800">To ensure proper functionality, please note that when you select "Create," "Update," or "Delete" permissions for any module, the corresponding "Read" permission will be automatically selected as well.</p>
                    <h3 className="font-medium text-base text-amber-800">Why is this happening?</h3>
                    <ul className="list-inside list-disc">
                        <li className="text-sm text-amber-800">The "Read" permission is required to view the contents of any module. Without it, you wouldn't be able to access the module, which could lead to confusion or errors.</li>
                        <li className="text-sm text-amber-800">By automatically enabling "Read" permission, we aim to provide a smoother and more intuitive experience, ensuring that all necessary permissions are in place without requiring additional steps from you.</li>
                    </ul>
                </div>
                <div className="grid gap-6 pb-14">
                    <Input label="Role Name" type="text" {...register("name")} />
                    {
                        permissions.slice(0,3).map((permission) =>
                        <Disclosure key={permission.label.toLowerCase()} as="div" className="border border-[#E1F4F4] rounded" defaultOpen={true}>
                            <div className="group bg-grey-dark-4 pl-4 pr-3 py-2.5 flex w-full items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <span className="text-base font-medium text-grey-dark-1 inline-flex">{permission.label}&nbsp;<span className="hidden md:block"> Permissions</span></span>
                                    <div className="text-sm px-2 py-0.5 bg-green-3 text-grey-dark-1 rounded-full">{values.role_list[permission.label.toLowerCase() as keyof typeof values.role_list]?.length} Selected</div>
                                </div>
                                <div className="flex items-center gap-10">
                                    <div className="flex items-center gap-2">
                                        <Checkbox 
                                            name="selectAll"
                                            onChange={() => handleAllCheckboxChange(permission.label.toLowerCase(), permission?.items)}
                                            checked={permission?.items?.every(item => (values.role_list[permission.label.toLowerCase() as keyof typeof values.role_list] as string[])?.includes(item.tag))}
                                        />
                                        <span className="text-sm text-grey-dark-1">Select all</span>
                                    </div>
                                    <DisclosureButton className="group">
                                        <Icon icon="ph:caret-down" className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180 transform transition-transform duration-300" />
                                    </DisclosureButton>
                                </div>
                            </div>
                            <DisclosurePanel transition className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-4 pt-4 px-4 pb-8 origin-top transition duration-300 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0">
                                {
                                    permission?.items?.map((item: Permission) =>
                                        <div key={item?.key} className="flex items-center gap-2 p-2">
                                            <Checkbox
                                                name={`role_list.${permission.label.toLowerCase()}`}
                                                onChange={() => handleCheckboxChange(permission.label.toLowerCase(), item)}
                                                checked={(values.role_list[permission.label.toLowerCase() as keyof typeof values.role_list] as string[])?.includes(item.tag)}
                                            />
                                            <span className="capitalize">{item?.key}</span>
                                        </div>
                                    )
                                }
                            </DisclosurePanel>
                        </Disclosure>
                        )
                    }
                    <Disclosure as="div" className="border border-[#E1F4F4] rounded" defaultOpen={true}>
                        <div className="group bg-[#FFE9E9] pl-4 pr-3 py-2.5 flex w-full items-center justify-between">
                            <div className="flex items-center gap-6">
                                <span className="text-base font-medium text-grey-dark-1 inline-flex">{permissions[3].label}&nbsp;<span className="hidden md:block"> Permissions</span></span>
                                <div className="text-sm px-2 py-0.5 bg-semantics-error text-white rounded-full">{values.role_list?.delete?.length} Selected</div>
                            </div>
                            <div className="flex items-center gap-10">
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        name="selectAll"
                                        onChange={() => handleAllCheckboxChange("delete", permissions[3]?.items)}
                                        checked={(values.role_list["delete"] as string[])?.length === permissions[3]?.items?.length}
                                    />
                                    <span className="text-sm text-grey-dark-1">Select all</span>
                                </div>
                                <DisclosureButton className="group">
                                    <Icon icon="ph:caret-down" className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180 transform transition-transform duration-300" />
                                </DisclosureButton>
                            </div>
                        </div>
                        <DisclosurePanel transition className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-4 pt-4 px-4 pb-8 origin-top transition duration-300 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0">
                            {
                                permissions[3]?.items?.map((item: Permission, idx: number) =>
                                    <div key={`${item?.key}-${idx}`} className="flex items-center gap-2 p-2">
                                        <Checkbox
                                            name="role_list.delete"
                                            value={`role_list.delete.${(values.role_list["delete"] as string[]).includes(item.tag)}`}
                                            onChange={() => handleCheckboxChange("delete", item)}
                                            checked={(values.role_list["delete"] as string[])?.includes(item.tag)}
                                        />
                                        <span className="capitalize">{item?.key}</span>
                                    </div>
                                )
                            }
                        </DisclosurePanel>
                    </Disclosure>
                    <RenderIf condition={!!errors?.role_list}>
                        <span className="ego-input--error">{errors?.role_list as string}</span>
                    </RenderIf>
                </div>
                <div className="flex items-center gap-4 justify-end">
                    <Button type="button" theme="secondary" onClick={() => navigate("/accounts/roles")}>Cancel</Button>
                    <Button type="submit" theme="primary" loading={isPending} disabled={isPending || !isValid}>Add Role</Button>
                </div>
            </form>
            </RenderIf>
            <RenderIf condition={isFetching}>
                <div className="flex w-full h-[90dvh] items-center justify-center"><Loader className="spinner size-6 text-green-1" /></div>
            </RenderIf>
        </motion.div>
    )
}