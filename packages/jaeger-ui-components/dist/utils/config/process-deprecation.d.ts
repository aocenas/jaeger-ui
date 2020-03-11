interface IDeprecation {
    formerKey: string;
    currentKey: string;
}
/**
 * Processes a deprecated config property with respect to a configuration.
 * NOTE: This mutates `config`.
 *
 * If the deprecated config property is found to be set on `config`, it is
 * moved to the new config property unless a conflicting setting exists. If
 * `issueWarning` is `true`, warnings are issues when:
 *
 * - The deprecated config property is found to be set on `config`
 * - The value at the deprecated config property is moved to the new property
 * - The value at the deprecated config property is ignored in favor of the value at the new property
 */
export default function processDeprecation(config: Record<string, any>, deprecation: IDeprecation, issueWarning: boolean): void;
export {};
