import { createContext, useContext, useReducer, useCallback } from 'react';

const ReportFormContext = createContext(null);
const ReportFormDispatchContext = createContext(null);

const initialState = {
    patientData: {
        name: '',
        surname: '',
        email: '',
    },
    reportData: {
        pathology: '',
        gender: 'masculino',
        recipient: 'entrevistado',
        notes: '',
    },
    catalogSelections: {},
    foodActions: [],
    isDirty: false,
};

function reportFormReducer(state, action) {
    switch (action.type) {
        case 'SET_PATIENT_DATA':
            return {
                ...state,
                patientData: { ...state.patientData, ...action.payload },
                isDirty: true,
            };

        case 'SET_REPORT_DATA':
            return {
                ...state,
                reportData: { ...state.reportData, ...action.payload },
                isDirty: true,
            };

        case 'TOGGLE_CATALOG_ITEM': {
            const { sectionSlug, itemId } = action.payload;
            const current = state.catalogSelections[sectionSlug] || [];
            const exists = current.includes(itemId);
            return {
                ...state,
                catalogSelections: {
                    ...state.catalogSelections,
                    [sectionSlug]: exists
                        ? current.filter((id) => id !== itemId)
                        : [...current, itemId],
                },
                isDirty: true,
            };
        }

        case 'SET_CATALOG_SELECTIONS': {
            const { sectionSlug, itemIds } = action.payload;
            return {
                ...state,
                catalogSelections: {
                    ...state.catalogSelections,
                    [sectionSlug]: itemIds,
                },
                isDirty: true,
            };
        }

        case 'ADD_FOOD_ACTION':
            return {
                ...state,
                foodActions: [...state.foodActions, action.payload],
                isDirty: true,
            };

        case 'UPDATE_FOOD_ACTION':
            return {
                ...state,
                foodActions: state.foodActions.map((fa, i) =>
                    i === action.payload.index
                        ? { ...fa, ...action.payload.data }
                        : fa
                ),
                isDirty: true,
            };

        case 'REMOVE_FOOD_ACTION':
            return {
                ...state,
                foodActions: state.foodActions.filter((_, i) => i !== action.payload),
                isDirty: true,
            };

        case 'LOAD_CONFIGURATION':
            return {
                ...action.payload,
                isDirty: false,
            };

        case 'LOAD_REPORT': {
            const { report, catalogItems } = action.payload;
            const selections = {};
            catalogItems.forEach((item) => {
                const slug = item.section?.slug || item.catalog_section_slug;
                if (slug) {
                    if (!selections[slug]) selections[slug] = [];
                    selections[slug].push(item.id);
                }
            });
            return {
                patientData: {
                    name: report.patient_name || '',
                    surname: report.patient_surname || '',
                    email: report.patient_email || '',
                },
                reportData: {
                    pathology: report.pathology || '',
                    gender: report.gender || 'masculino',
                    recipient: report.recipient || 'entrevistado',
                    notes: report.notes || '',
                },
                catalogSelections: selections,
                foodActions: (report.food_actions || []).map((fa) => ({
                    source_type: fa.source_type,
                    source_id: fa.source_id,
                    source_name: fa.source_name || '',
                    frequency: fa.frequency,
                    emphasis: fa.emphasis,
                })),
                isDirty: false,
            };
        }

        case 'RESET':
            return { ...initialState };

        default:
            return state;
    }
}

export function ReportFormProvider({ children, initialReport = null }) {
    let init = initialState;
    if (initialReport) {
        init = reportFormReducer(initialState, {
            type: 'LOAD_REPORT',
            payload: initialReport,
        });
    }

    const [state, dispatch] = useReducer(reportFormReducer, init);

    return (
        <ReportFormContext.Provider value={state}>
            <ReportFormDispatchContext.Provider value={dispatch}>
                {children}
            </ReportFormDispatchContext.Provider>
        </ReportFormContext.Provider>
    );
}

export function useReportForm() {
    const state = useContext(ReportFormContext);
    if (!state) throw new Error('useReportForm must be used within ReportFormProvider');
    return state;
}

export function useReportDispatch() {
    const dispatch = useContext(ReportFormDispatchContext);
    if (!dispatch) throw new Error('useReportDispatch must be used within ReportFormProvider');
    return dispatch;
}

export function useSerializeReport() {
    const state = useContext(ReportFormContext);

    return useCallback(() => {
        const allSelections = Object.values(state.catalogSelections).flat();
        return {
            patient_name: state.patientData.name,
            patient_surname: state.patientData.surname,
            patient_email: state.patientData.email,
            pathology: state.reportData.pathology,
            gender: state.reportData.gender,
            recipient: state.reportData.recipient,
            notes: state.reportData.notes,
            catalog_selections: allSelections,
            food_actions: state.foodActions.map(({ source_name, ...rest }) => rest),
        };
    }, [state]);
}
