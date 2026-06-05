import { MenuItem } from "@mui/material";
import { useGetFundingSources } from "../../../customHooks/queries/useProjects";
import CustomInput from "../../locations/CustomInput";

const Funding = ({ styles, formData, setFormData, errors }) => {
  const {
    data: fundingSourcesData,
    isPending: isFetchingFundingSources,
    error: fundingSourcesError,
  } = useGetFundingSources();

  const fundingSources = fundingSourcesData?.data || [];

  return (
    <div className="form-holder">
      {/* الجهات الممولة */}
      <div className="input-holder" style={styles}>
        <CustomInput
          label="الجهات الممولة"
          inputType="select"
          value={formData.funding_source || ""}
          setValue={(e) =>
            setFormData((prev) => ({
              ...prev,
              funding_source: e.target.value,
            }))
          }
          isNestedState={true}
          isDisabled={isFetchingFundingSources}
          helperText={
            isFetchingFundingSources
              ? "جارِ جلب الجهات الممولة..."
              : fundingSourcesError
                ? "حدث خطأ أثناء جلب الجهات الممولة"
                : fundingSources.length === 0
                  ? "لا توجد جهات ممولة حالياً"
                  : ""
          }
          errorMsg={errors?.funding_source || null}
          isRequired={true}
        >
          {fundingSources.map((src) => (
            <MenuItem key={src} value={src}>
              {src}
            </MenuItem>
          ))}
        </CustomInput>
      </div>

      {/* الجهة المنفذة */}
      <div className="input-holder" style={styles}>
        <CustomInput
          label="الجهة المنفذة"
          inputType="input"
          placeholder="أدخل اسم الجهة المنفذة"
          value={formData.Implementing_party || ""}
          setValue={(e) =>
            setFormData((prev) => ({
              ...prev,
              Implementing_party: e.target.value,
            }))
          }
          isNestedState={true}
          errorMsg={errors?.Implementing_party || null}
          isRequired={true}
        />
      </div>

      {/* الكلفة المقدرة */}
      <div className="input-holder" style={styles}>
        <CustomInput
          label="الكلفة المقدرة"
          inputType="input"
          placeholder="أدخل الكلفة التقديرية للمشروع"
          value={formData.estimated_cost || ""}
          setValue={(e) => {
            const value = e.target.value;

            if (!isNaN(value)) {
              setFormData((prev) => ({
                ...prev,
                estimated_cost: value,
              }));
            }
          }}
          isNestedState={true}
          errorMsg={errors?.estimated_cost || null}
          isRequired={true}
        />
      </div>
    </div>
  );
};

export default Funding;
