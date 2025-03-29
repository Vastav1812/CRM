import { NavigationDrawerItemForObjectMetadataItem } from '@/object-metadata/components/NavigationDrawerItemForObjectMetadataItem';
import { ObjectMetadataItem } from '@/object-metadata/types/ObjectMetadataItem';
import { NavigationDrawerAnimatedCollapseWrapper } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerAnimatedCollapseWrapper';
import { NavigationDrawerSection } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerSection';
import { NavigationDrawerSectionTitle } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerSectionTitle';

const ORDERED_STANDARD_OBJECTS = [
  'contact',
  'company',
  'opportunity',
  'task',
  'note',
];

const DISPLAY_NAMES: Record<string, string> = {
  person: 'Contacts',
  company: 'Companies',
  opportunity: 'Leads',
  task: 'Tasks',
  note: 'Notes',
};

const SECTIONS: Record<string, string[]> = {
  Prospecting: ['person', 'company', 'opportunity'],
  Tasks: ['task'],
  Notes: ['note'],
};

export type NavigationDrawerSectionForObjectMetadataItemsProps = {
  sectionTitle: string;
  objectMetadataItems: ObjectMetadataItem[];
  isRemote?: boolean;
};

export const NavigationDrawerSectionForObjectMetadataItems = ({
  sectionTitle,
  objectMetadataItems,
  isRemote = false,
}: NavigationDrawerSectionForObjectMetadataItemsProps) => {
  const sections = Object.entries(SECTIONS).map(([sectionName, items]) => {
    const sectionItems = objectMetadataItems
      .filter((item) => items.includes(item.nameSingular))
      .sort((a, b) => {
        const aIndex = items.indexOf(a.nameSingular);
        const bIndex = items.indexOf(b.nameSingular);
        return aIndex - bIndex;
      });

    return {
      name: sectionName,
      items: sectionItems,
    };
  });

  return (
    <>
      {sections.map((section) => (
        <NavigationDrawerSection key={section.name}>
          <NavigationDrawerSectionTitle label={section.name} />
          <NavigationDrawerAnimatedCollapseWrapper>
            {section.items.map((objectMetadataItem) => (
              <NavigationDrawerItemForObjectMetadataItem
                key={objectMetadataItem.id}
                objectMetadataItem={{
                  ...objectMetadataItem,
                  labelPlural:
                    DISPLAY_NAMES[objectMetadataItem.nameSingular] ||
                    objectMetadataItem.labelPlural,
                }}
              />
            ))}
          </NavigationDrawerAnimatedCollapseWrapper>
        </NavigationDrawerSection>
      ))}
    </>
  );
};
